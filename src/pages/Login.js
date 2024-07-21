import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://backend-node-weathered-waterfall-3385.fly.dev/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            setToken(data.token);
            console.log(data.token)
            localStorage.setItem('authToken', data.token);
            navigate('/dashboard');

        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p style={{color: 'red'}}>Email o password incorrectos</p>}
            </div>
            <div className="signup-link">
                <Link to={'/signup'}>Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;
