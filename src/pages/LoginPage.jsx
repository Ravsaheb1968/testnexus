import { useState } from 'react';
import './LoginPage.css';
import loginBg from '/images/Logo.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('token', 'sample-jwt-token');
      window.location.href = '/activate-user';
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src={loginBg} alt="Login Illustration" />
      </div>

      <div className="login-right">
        <h2>
          Welcome to <span className="brand">TestNexus</span>
        </h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">
            <FaEnvelope className="icon" />
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">
            <FaLock className="icon" />
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
