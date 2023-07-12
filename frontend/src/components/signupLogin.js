import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupLogin = ({ onSuccessfulLogin, onSuccessfulSignup }) => {
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Make the API request to login
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                }),
            });

            // Parse the response as JSON
            const data = await response.json();

            // Check if the response is successful
            if (response.ok) {
                // Call the onSuccessfulLogin callback with the user's email
                localStorage.setItem("token".response.token);
                onSuccessfulLogin(loginEmail);
                toast('Login Successful');
            } else {
                // Show an error toast notification
                toast.error(data.message);
            }
        } catch (error) {
            // Show a generic error toast notification
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            // Make the API request to signup
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: signupName,
                    email: signupEmail,
                    password: signupPassword,
                }),
            });

            // Parse the response as JSON
            const data = await response.json();

            // Check if the response is successful
            if (response.ok) {
                // Call the onSuccessfulSignup callback
                onSuccessfulSignup();
                toast.success(data.message);
                toast.info('Sign up successful! Please log in.');
            } else {
                // Show an error toast notification
                toast.error(data.message);
            }
        } catch (error) {
            // Show a generic error toast notification
            toast.error('An error occurred. Please try again.');
        }

        // Clear the signup form
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
    };

    return (
        <div className="container">
            <h1>PDF Management System</h1>
            <h2>Sign Up</h2>
            <form id="signup-form" onSubmit={handleSignup}>
                <input
                    type="text"
                    id="signup-name"
                    placeholder="Name"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                />
                <input
                    type="email"
                    id="signup-email"
                    placeholder="Email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="signup-password"
                    placeholder="Password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            <h2>Login</h2>
            <form id="login-form" onSubmit={handleLogin}>
                <input
                    type="email"
                    id="login-email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="login-password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignupLogin;
