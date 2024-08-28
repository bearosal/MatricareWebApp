import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import "../../styles/pages/signup.css";
import { IoMdArrowRoundBack } from "react-icons/io";

function Signup(props) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        userType: '',
        phoneNumber: ''
    });
    const [error, setError] = useState('');

    const { fullName, email, username, password, confirmPassword, userType, phoneNumber } = formData;

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async e => {
        e.preventDefault();

        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5005/matricare-web/server/routes/users/signup', formData);

            if (response.status === 201) {
                localStorage.setItem('fullName', fullName);
                localStorage.setItem('email', email);
                localStorage.setItem('username', username);
                localStorage.setItem('userType', userType);
                localStorage.setItem('phoneNumber', phoneNumber);
                props.history.push("/login");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error occurred during signup');
            console.error('Signup error:', err.response?.data || err);
        }
    };

    return (
        <div className="signup-outer-container signup-background" style={{
            position: 'relative',
            zIndex: 0,
          }}>
            <div className="background-image" style={{
              position: 'absolute',
              top: -50,
              left: 0,
              width: '100%',
              height: '1000px',
              backgroundImage: 'url("/img/login.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.9,
              zIndex: -1, // Ensure the background is behind all other content
            }}/>

            <Link to="/login" className="SU-back-button"><IoMdArrowRoundBack /></Link>
            <h2 className="signup-welcome-message">Create New Account!</h2>
            <p className="sign-up-text">Already have an Account? <Link to="/login">Log in here!</Link></p>
                {error && <p className="signup-error-message">{error}</p>}

                <div className="signup-container">
                <form onSubmit={handleSignup}>
                <div className="SU-form-group">
                      <input
                        className="SU-form-input"
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder=" "
                        value={fullName}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="fullName" className="SU-form-label">Full Name:</label>
                    </div>
                    <div className="SU-form-group">
                      <input
                        className="SU-form-input"
                        type="email"
                        name="email"
                        id="email"
                        placeholder=" "
                        value={email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="email" className="SU-form-label">Email:</label>
                    </div>    
                    <div className="SU-form-group">
                      <input
                        className="SU-form-input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder=" "
                        value={username}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="username" className="SU-form-label">Username:</label>
                    </div>   
    
                    <div className="SU-form-group">
                    <input
                        className="SU-form-input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder=" "
                        value={password}
                        onChange={handleChange}
                        style={{ padding: '15px', width: '400px' }}
                        required
                      />
                      <label htmlFor="password" className="SU-form-label">Password:</label>
                      </div>

                      <div className="SU-form-group">
                    <input
                        className="SU-form-input"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder=" "
                        value={confirmPassword}
                        onChange={handleChange}
                        style={{ padding: '15px', width: '400px' }}
                        required
                      />
                      <label htmlFor="confirmPassword" className="SU-form-label">Confirm Password:</label>
                      </div>

                      <div className="SU-form-group">
                      <input
                        className="SU-form-input"
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder=" "
                        value={phoneNumber}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="phoneNumber" className="SU-form-label">Phone Number:</label>
                    </div> 
                    <div className="SU-form-group">
                    <button type="submit" className="SU-button">SIGN UP</button>
                  </div>
                </form>
                </div>
          
        </div>
    );
}

export default withRouter(Signup);
