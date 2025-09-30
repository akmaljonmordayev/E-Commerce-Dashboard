import React from 'react';
import './src/bigComponents/logIn/login.css';

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login form submitted!');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="forgot-password">
            <a href="#forgot">Forgot password?</a>
          </div>

          <button type="submit" className="btn-primary">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;