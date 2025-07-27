import React, { useState } from 'react';
import './LoginPage.css';
import loginIllustration from './images/login-illustration.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Logging in as ${email}`);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to TestNexus</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>

      <div className="login-info-section">
        <img src={loginIllustration} alt="Login Illustration" className="login-illustration" />
        <h3>🔹 What is TestNexus?</h3>
        <p>
          TestNexus is a modern platform to manage automated test suites, user roles,
          and environment allocations—all from a single interface.
        </p>
        <ul>
          <li>✅ User and Admin management</li>
          <li>✅ Trigger, block, and monitor test cases</li>
          <li>✅ Project-wise function area control</li>
          <li>✅ eZAutomate compatibility</li>
        </ul>
      </div>
    </div>
  );
}

export default LoginPage;