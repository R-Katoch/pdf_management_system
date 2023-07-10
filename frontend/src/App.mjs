import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignupLogin from './components/signupLogin.mjs';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is already logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setLoggedIn(true);
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    // Perform logout logic here
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem('user');
    toast('Logout Successful');
  };

  const handleSuccessfulLogin = (email) => {
    setUser(email);
    setLoggedIn(true);
    localStorage.setItem('user', email);
  };

  const handleSuccessfulSignup = () => {
    toast.info('Sign up successful! Please log in.');
  };

  return (
    <div className="container">
      <h1>PDF Management System</h1>
      {!loggedIn ? (
        <SignupLogin onSuccessfulLogin={handleSuccessfulLogin} onSuccessfulSignup={handleSuccessfulSignup} />
      ) : (
        <>
          <h2>Welcome, {user}!</h2>
          <button onClick={handleLogout}>Logout</button>
          {/* Your file management code here */}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export { App };
