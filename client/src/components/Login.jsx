import React from 'react';

const Login = () => {
  return (
    <div className="login-container">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <div className="button-container">
        <button className="login-button">Login</button>
        <button className="signup-button">Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
