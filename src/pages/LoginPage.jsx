import { useState, useEffect } from 'react';
import './LoginPage.css';
import loginBg from '/images/Logo.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, user } = res.data;

      // Store JWT token in localStorage
      localStorage.setItem('token', token);

      // Handle "Remember Me"
      if (remember) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/activate-user');
      } else {
        navigate('/dashboard-user');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  useEffect(() => {
    const remembered = localStorage.getItem('rememberedEmail');
    if (remembered) {
      setEmail(remembered);
      setRemember(true);
    }
  }, []);

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
          <div className="form-group">
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
              style={{ color: '#000' }}
            />
          </div>

          <div className="form-group">
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
              style={{ color: '#000' }}
            />
          </div>

          <div className="form-meta">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember Me
            </label>
            <div>
              <a href="#" className="forgot">
                Forgot Password?
              </a>
            </div>
          </div>

          <button type="submit" id="log-btn">
            Login
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <p className="register-link">
          New user? <a href="/signup">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
