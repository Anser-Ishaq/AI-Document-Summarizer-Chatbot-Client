import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../../api/authApi';
import useAlert from '../../Hooks/useAlerts';
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const {showError,showSuccess} = useAlert()
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signupUser({
                email: formData.email,
                password: formData.password,
                userName: formData.username,
            });

            console.log('Signup successful:', response);
            localStorage.setItem("userId", response.data.user.id)
            localStorage.setItem("userName",formData.username)
            // alert(response.message)
            showSuccess(response.message)
            setSuccess(response.message)
            navigate('/login');
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.response?.data?.message || 'Signup failed');
            showError("Oops...", err.response?.data?.message || "Something went wrong!");
        }
    };
    return (
        <div className="login-form">
            <div className="auth-container">
                <div className="login-card">
                    {/* <h2>Signup</h2> */}
                    <div className="head">
                        <span>Start your Journey</span>
                        <h5 className="title">Create an account</h5>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label for="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            onChange={handleChange}
                        />


                        <label for="username">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            onChange={handleChange}
                        />

                        <label for="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            onChange={handleChange}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button className="rts-btn btn-primary">Create Account</button>
                        <p>If you have an account? <Link className="ml--5" to="/login">Sign in</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register