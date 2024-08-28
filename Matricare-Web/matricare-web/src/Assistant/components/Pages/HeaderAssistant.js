import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactPage from './ContactAssistant';
import { FaBell } from 'react-icons/fa';
import Notifications from './NotificationAssistant';
import '../../style/pages/headerassistant.css';

export default function Header({ onLogout, isLoggedIn }) {
  const [showContactForm] = useState(false);
  const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);
  const [showLibraryDropdown, setShowLibraryDropdown] = useState(false);
  const [showUserProfileDropdown, setShowUserProfileDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // State to manage the notification
  const [notificationMessage, setNotificationMessage] = useState(''); // State to manage the notification message

  const handleBellClick = () => {
    setNotificationMessage('You have a new notification!');
    setShowNotification(true);
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
    setNotificationMessage('');
  };

  const handleLibraryClick = () => {
    setShowLibraryDropdown(!showLibraryDropdown); // Toggle the visibility of the dropdown
  };

  return (
    <header className="header">
      {showContactForm ? (
        <ContactPage />
      ) : (
        <>
          <div className="header-left">
            <nav>
              <ul className="nav-links">
                <li><Link to="/assistant-landing">Home</Link></li>
                <li><Link to="/appointment-assistant">Appointment</Link></li>
                <li
                  className="dropdown library-dropdown"
                  onMouseEnter={() => setShowLibraryDropdown(true)}
                  onMouseLeave={() => setShowLibraryDropdown(false)}
                >
                  <Link to="/library-dropdown" onClick={handleLibraryClick} className="dropdown-link">Library</Link>
                  {showLibraryDropdown && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item"><Link to="/assistant-library-item1">First Trimester</Link></div>
                      <div className="dropdown-item"><Link to="/assistant-library-item2">Second Trimester</Link></div>
                      <div className="dropdown-item"><Link to="/assistant-library-item3">Third Trimester</Link></div>
                      <div className="dropdown-item"><Link to="/assistant-library-item4">Pregnancy Week by Week</Link></div>
                      <div className="dropdown-item"><Link to="/assistant-library-item5">Morning Sickness</Link></div>
                      <div className="dropdown-item"><Link to="/assistant-library-item6">Pregnancy Discharge</Link></div>
                      <div className="dropdown-item"><Link to="/assistant-library-item7">Signs of Labor</Link></div>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-center">
            <img src="img/LOGO.png" alt="Logo" className="logo" />
          </div>
          <div className="header-right">
            <ul className="nav-links">
            <li><Link to="/assistant-profile">Profile</Link></li>
              <li><Link to="/assistant-contact">Contact Us</Link></li>
            
              <li>
                <Link to="/login" onClick={onLogout} className="logout-link">
                  <button className="log-out-button">LOGOUT</button>
                </Link>
              </li>

              <li>
                <Link to="/assistant-notification" onClick={handleBellClick}>
                  <FaBell className="notification-icon" />
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
      {/* Notification component */}
      {showNotification && <Notifications message={notificationMessage} onClose={handleNotificationClose} />}
    </header>
  );
}