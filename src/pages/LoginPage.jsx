import { useState } from 'react';
import './LoginPage.css';
import loginBg from '/images/Logo.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const makeFakeToken = ({ email, role }) => {
  // simple unsigned base64 payload; in real app use real JWT from backend
  const payload = {
    email,
    role,
    exp: Math.floor(Date.now() / 1000) + 3600, // expires in 1h
  };
  return `fake.${btoa(JSON.stringify(payload))}.token`;
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Basic mock validation
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // Simulate authentication delay
    try {
      // Determine role: crude rule for demo
      const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
      const token = makeFakeToken({ email, role });

      localStorage.setItem('token', token);
      if (remember) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Redirect to dashboard-user (non-admin) or activate-user if admin
      if (role === 'admin') {
        navigate('/activate-user');
      } else {
        navigate('/dashboard-user');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Try again.');
    }
  };

  // Pre-fill remembered email
  useState(() => {
    const remembered = localStorage.getItem('rememberedEmail');
    if (remembered) {
      setEmail(remembered);
      setRemember(true);
    }
  });

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
      </div>
    </div>
  );
};

export default Login;
