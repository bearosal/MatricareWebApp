import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactPage from './ContactPage';
import { FaBell } from 'react-icons/fa';
import Notifications from './ConsultantNotifications';
import '../../styles/pages/headerconsultant.css';

export default function HeaderConsultant({ onLogout, isLoggedIn }) {
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

  return (
    <header className="header1">
      {showContactForm ? (
        <ContactPage />
      ) : (
        <>
          <div className="header-left">
            <nav>
              <ul className="nav-links">
                <li><Link to="/consultant-landing">Home</Link></li>
                <li
                  className="dropdown"
                  onMouseEnter={() => setShowFeaturesDropdown(true)}
                  onMouseLeave={() => setShowFeaturesDropdown(false)}
                >
                  <p>Features</p>
                  {showFeaturesDropdown && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item"><Link to="/consultant-appointment">Appointment List</Link></div>
                      <div className="dropdown-item"><Link to="/consultant-virtual">Virtual Consultation</Link></div>
                    </div>
                  )}
                </li>
                <li
                  className="dropdown library-dropdown"
                  onMouseEnter={() => setShowLibraryDropdown(true)}
                  onMouseLeave={() => setShowLibraryDropdown(false)}
                >
                  <p>Library</p>
                  {showLibraryDropdown && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item"><Link to="/consultant-library-item1">First Trimester</Link></div>
                      <div className="dropdown-item"><Link to="/consultant-library-item2">Second Trimester</Link></div>
                      <div className="dropdown-item"><Link to="/consultant-library-item3">Third Trimester</Link></div>
                      <div className="dropdown-item"><Link to="/consultant-library-item4">Pregnancy Week by Week</Link></div>
                      <div className="dropdown-item"><Link to="/consultant-library-item5">Morning Sickness</Link></div>
                      <div className="dropdown-item"><Link to="/consultant-library-item6">Pregnancy Discharge</Link></div>
                      <div className="dropdown-item"><Link to="/consultant-library-item7">Signs of Labor</Link></div>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
          <div className="header-center-1">
            <img src="img/LOGO.png" alt="Logo" className="logo11" />
          </div>
          <div className="header-right">
            <ul className="nav-links">
              <li
                className="dropdown"
                onMouseEnter={() => setShowUserProfileDropdown(true)}
                onMouseLeave={() => setShowUserProfileDropdown(false)}
              >
                <p>Settings</p>
                {showUserProfileDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item"><Link to="/consultant-profile">Consultant Profile</Link></div>
                    <div className="dropdown-item"><Link to="/consultant-records">Medical Records</Link></div>
                    <div className="dropdown-item"><Link to="/consultant-prescription">Online Prescription</Link></div>
                  </div>
                )}
              </li>
              <li><Link to="/consultant-contactus">Contact Us</Link></li>
              <li>
                <Link to="/consultant-notification" onClick={handleBellClick}>
                  <FaBell className="notification-icon" />
                </Link>
              </li>
              <li>
                <Link to="/" onClick={onLogout} className="logout-link">
                  <button className="log-out-button">LOGOUT</button>
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
