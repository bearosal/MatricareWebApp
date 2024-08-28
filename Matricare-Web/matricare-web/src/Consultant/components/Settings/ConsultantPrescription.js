import React, { useState } from 'react';
import '../../styles/settings/consultantprescription.css';
import { IoChevronBackCircle, IoLockClosed } from "react-icons/io5";
import { Link } from 'react-router-dom';


const userPassword = 'securePassword123';

const ConsultantPrescription = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    consultantName: '',
    datePrescribed: '',
    dateValidity: '',
    medicineName: '',
    dosage: '',
    amount: '',
    time: ''
  });

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === userPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="consultant-prescription-container">
      {!isAuthenticated ? (
        <div className="consultant-prescription-password-container">
          <div className="background-image-medical" style={{ backgroundImage: `url('/img/bg6.jpg')` }}></div>
          <div className="overlay"></div>
          <Link to="/consultant-landing" className="back-button-prescription1"><IoChevronBackCircle /></Link>
          <div className="left-section">
            <div className="lock-icon">
              <IoLockClosed />
              <p>MatriCare</p>
            </div>
          </div>
          <h3 className="password-title">Enter Password</h3>
          <form onSubmit={handlePasswordSubmit} className="consultant-prescription-password-form">
            <div className="password-input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="consultant-prescription-button-1">Submit</button>
            </div>
          </form>
          {error && <p className="consultant-prescription-error">{error}</p>}
        </div>
      ) : (
        <div className="consultant-prescription-main-content">
          <div className="consultant-prescription-nav">
            <img src="/img/logo3.png" alt="Logo" className="logo-image-prescription" />
          </div>
          <div className="consultant-prescription-content">
            <div className="consultant-prescription-header-container" style={{ backgroundImage: "url('img/bg5.jpg')" }}> 
              <Link to="/consultant-landing" className="back-button-prescription"><IoChevronBackCircle /></Link>
              <h2 className="medical-title-prescription">Doctor's</h2>
              <h1 className="prescription-title-medical">Prescription</h1>
            </div>
            <div className="consultant-prescription-form-container">
              <div className="consultant-prescription-form">
                <input
                  type="text"
                  name="consultantName"
                  value={formData.consultantName}
                  onChange={handleInputChange}
                  placeholder="Consultant Name"
                />
                <input
                  type="date"
                  name="datePrescribed"
                  value={formData.datePrescribed}
                  onChange={handleInputChange}
                  placeholder="Date Prescribed"
                />
                <input
                  type="date"
                  name="dateValidity"
                  value={formData.dateValidity}
                  onChange={handleInputChange}
                  placeholder="Date of Validity"
                />
                <input
                  type="text"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleInputChange}
                  placeholder="Medicine Name"
                />
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  placeholder="Dosage"
                />
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Amount"
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="Time"
                />
                <button type="button" className="consultant-prescription-button" onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantPrescription;
