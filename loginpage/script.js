        const formContainer = document.getElementById('form-container');
        const formTitle = document.getElementById('form-title');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const otpInput = document.getElementById('otp');
        const submitBtn = document.getElementById('submit-btn');
        const toggleForm = document.getElementById('toggle-form');
        const forgotPassword = document.getElementById('forgot-password');
        const messageDiv = document.getElementById('message');
        const passwordGroup = document.getElementById('password-group');
        const otpGroup = document.getElementById('otp-group');

        let isLogin = true; // Flag to toggle between login and signup
        let isReset = false; // Flag to toggle reset password form
        let otp = null; // OTP placeholder

        toggleForm.addEventListener('click', () => {
            isLogin = !isLogin;
            isReset = false;
            otp = null;
            formTitle.textContent = isLogin ? 'Login' : 'Sign Up';
            submitBtn.textContent = isLogin ? 'Login' : 'Sign Up';
            toggleForm.innerHTML = isLogin 
                ? "Don't have an account? <a>Sign Up</a>" 
                : "Already have an account? <a>Login</a>";
            forgotPassword.style.display = isLogin ? 'block' : 'none';
            messageDiv.textContent = '';
            emailInput.value = '';
            passwordInput.value = '';
            otpInput.value = '';
            otpGroup.classList.add('hidden');
            passwordGroup.style.display = 'block';
        });

        forgotPassword.addEventListener('click', () => {
            isReset = true;
            isLogin = false;
            otp = null;
            formTitle.textContent = 'Reset Password';
            submitBtn.textContent = 'Send OTP';
            toggleForm.style.display = 'none';
            forgotPassword.style.display = 'none';
            passwordGroup.style.display = 'none';
            otpGroup.classList.add('hidden'); // Initially hidden
            messageDiv.textContent = '';
            emailInput.value = '';
            otpInput.value = '';
        });
        
        submitBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const enteredOtp = otpInput.value.trim();
        
            if (!email || (!password && isLogin)) {
                messageDiv.textContent = 'Please fill out all fields.';
                return;
            }
        
            if (isReset) {
                if (!otp) { // Generate and send OTP
                    if (localStorage.getItem(email)) {
                        otp = Math.floor(100000 + Math.random() * 900000).toString(); // Save OTP to variable
                        const serviceID = "service_dao1d0o";
                        const templateID = "template_cyzdyba";
                        const templateParameter = {
                            otp: otp,
                            reply_to: email,
                        };
                        emailjs.send(serviceID, templateID, templateParameter).then(
                            (response) => {
                                console.log(response);
                                if (response) {
                                    alert("OTP sent to your email: " + email);
                                    otpGroup.classList.remove('hidden'); // Show OTP input
                                    submitBtn.textContent = 'Verify OTP'; // Update button text
                                }
                            }
                        );
                    } else {
                        messageDiv.textContent = 'Email not found.';
                        messageDiv.style.color = 'red';
                    }
                } else if (enteredOtp === otp) { // Verify OTP
                    const newPassword = prompt('Enter your new password:');
                    if (newPassword) {
                        localStorage.setItem(email, newPassword);
                        messageDiv.textContent = 'Password reset successful! You can now login.';
                        messageDiv.style.color = 'green';
                        toggleForm.click(); // Switch to login form
                    } else {
                        messageDiv.textContent = 'Password reset cancelled.';
                        messageDiv.style.color = 'red';
                    }
                } else {
                    messageDiv.textContent = 'Invalid OTP.';
                    messageDiv.style.color = 'red';
                }
            } else if (isLogin) { // Login flow
                const storedPassword = localStorage.getItem(email);
                if (storedPassword && storedPassword === password) {
                    messageDiv.textContent = 'Login successfully completed!';
                    messageDiv.style.color = 'green';
                } else {
                    messageDiv.textContent = 'Invalid email or password.';
                    messageDiv.style.color = 'red';
                }
            } else { // Sign-up flow
                if (localStorage.getItem(email)) {
                    messageDiv.textContent = 'Email is already registered.';
                    messageDiv.style.color = 'red';
                } else {
                    localStorage.setItem(email, password);
                    messageDiv.textContent = 'Signup successful! You can now login.';
                    messageDiv.style.color = 'green';
                    toggleForm.click(); // Switch to login form
                }
            }
        });