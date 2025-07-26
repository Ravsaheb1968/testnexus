import { useState } from 'react';
import './Login.css';
import loginBg from '../../images/Logo.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    // ...existing code...
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        // Simulate login success
        localStorage.setItem('token', 'sample-token');
        if (remember) localStorage.setItem('rememberedUser', email);
        navigate('/activate-user'); // Use valid route
    
    };

    return (
        <div className="login-wrapper">
            <div className="login-left">
                <img src={loginBg} alt="Illustration" />
            </div>
            <div className="login-right">
                <h2>Welcome to <span className="brand">TestNexus</span></h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group floating">
                        <label htmlFor="email"><FaEnvelope /> Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group floating">
                        <label htmlFor="password"><FaLock /> Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-meta">
                        <div className="remember-me">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className="forgot">Forgot password?</a>
                    </div>
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;