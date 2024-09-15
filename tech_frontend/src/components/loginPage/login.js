import './login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('user'); // Track login type
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for the POST request
        const data = {
            email,
            password,
        };

        // Determine the login route based on the selected login type
        const route = loginType === 'user' ? '/ulogin' : '/Plogin';

        try {
            const response = await axios.post(`http://localhost:5000${route}`, data);
            console.log(response.data); // Handle the response
            setMessage('Login successful');
            setTimeout(() => {
                setMessage('');
                setEmail('');
                setPassword('');
                navigate('/Home');
            }, 2000);
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <>
            <div className="body">
                <div className="wrapper">
                    {message && <h2 className='msg'>{message}</h2>}
                    <h1 className="title">Login</h1>

                    {/* Dropdown to select User Login or Professional Login */}
                    <div className="login-type">
                        <label htmlFor="loginType">Login Type:</label>
                        <select
                            id="loginType"
                            value={loginType}
                            onChange={(e) => setLoginType(e.target.value)}
                        >
                            <option value="user">User Login</option>
                            <option value="professional">Professional Login</option>
                        </select>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="info">
                            <div className="input-box">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="btn">
                            <input type="submit" value="Login" />
                        </div>
                        <p className='new'>Don't have an account? <a href="/UserReg" className='acc'>Create Account</a></p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;