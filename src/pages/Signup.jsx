import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'user',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
        if (response.status === 201) {
          const { token, user } = response.data;

          // ✅ Store JWT token
          localStorage.setItem('token', token);

          // ✅ Optionally store user role/email for later usage
          localStorage.setItem('user', JSON.stringify(user));

          // alert('✅ You are successfully registered!');
          // navigate('/'); // Redirect to login
          toast.success('✅ You are successfully registered!');
          setTimeout(() => navigate('/'), 1500); // Redirect after showing toast
        }
      } catch (err) {
        const msg = err.response?.data?.msg || 'Something went wrong!';
        // setErrors({ api: msg });
        toast.error(msg);
      }
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Register</h2>
        <p className="subtitle">Join TestNexus and start your journey</p>
        <form onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="signup-btn">Register</button>
          {errors.api && <p className="error">{errors.api}</p>}
        </form>

        <p className="redirect-text">
          Already have an account? <span onClick={() => navigate('/')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
