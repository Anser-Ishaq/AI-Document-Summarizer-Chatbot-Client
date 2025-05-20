import React, { useState } from 'react'
import "./auth.css"
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import useAlert from '../../Hooks/useAlerts';
import useAuthStore from '../../Store/authStore';

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { showError, showSuccess } = useAlert()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser({ email: formData.email, password: formData.password });
            showSuccess(res?.message)
            const user = res?.data?.user;
            const token = res?.data?.session?.access_token;
            useAuthStore.getState().login({ user, token });
            console.log("Login success:", res);
            navigate("/")
            // store token/session if needed
        } catch (err) {
            // alert(err.response?.data?.message || "Login failed");
            showError("Oops...", err.response?.data?.message || "Something went wrong!")
        }
    };
    return (
        <>
            <div className="login-form">
                <div className="container">
                    <div className="login-card">
                        {/* <h2>Signup</h2> */}
                        <div className="head">
                            <span>Welcome Back</span>
                            <h5 className="title">Login to continue</h5>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Email:</label>
                            <input type="email" id="username" name="email" value={formData.email} onChange={handleChange} required />

                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

                            <button type="submit" className="rts-btn btn-primary mb-3">Sign In</button>
                            <p>Don't have an account? <Link className="ml--5" to="/register">Sign Up for Free</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login