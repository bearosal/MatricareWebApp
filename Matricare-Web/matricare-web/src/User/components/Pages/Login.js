import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../styles/pages/login.css";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!username.trim() || !password.trim() || !userType) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/matricare-web/routes/User/login', { username, password });

      // Check response data for login status
      if (response.data.message === 'Login successful') {
        // Redirect based on userType or show appropriate message
        switch (userType) {
          case 'Patient':
            window.location.href = '/app';
            break;
          case 'Secretary':
            window.location.href = '/secretary-dashboard'; // Assuming a route for Secretary
            break;
          case 'Doctor':
            window.location.href = '/doctor-dashboard'; // Assuming a route for Doctor
            break;
          default:
            setError('Invalid user type.');
        }
      } else {
        setError('Invalid credentials.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error occurred during login');
    }
  };

  return (
    <div className="login-outer-container login-background" style={{
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
      <Link to="/" className="login-back-button"><IoMdArrowRoundBack /></Link>  
      <h2 className="login-welcome-message">Welcome Back!</h2>
      <p className="login-sign-up-text">Don't have an account? <Link to="/signup">Sign Up here!</Link></p>
        {error && <p className="login-error-message">{error}</p>}

        <div className="container-login">
        <form onSubmit={handleLogin}>
                      <div className="LI-form-group">
                      <input
                        className="LI-form-input"
                        type="text"
                        id="username"
                        placeholder=" "
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label htmlFor="username" className="LI-form-label">Username:</label>
                    </div>
                    <div className="LI-form-group">
                    <input
                        className="LI-form-input"
                        type="password"
                        id="password"
                        placeholder=" "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '15px', width: '400px' }}
                        required
                      />

                      <label htmlFor="password" className="LI-form-label">Password:</label>
                      </div>
                      <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                      </div>
                    <div className="LI-form-group">
                    <select
                      id="userType"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <option value="">Select User Type</option>
                      <option value="Patient">Patient</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Assistant">Assistant</option>
                    </select>
                    </div>
                    <div className="LI-form-group">
                    <button type="submit" className="LI-button">LOGIN</button>
                  </div>
        </form>
      </div>
      </div>
  );
}
