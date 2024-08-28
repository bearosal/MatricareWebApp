import React, { useState } from 'react';
import '../../styles/features/emergency.css';
import { IoArrowBack, IoSettingsOutline, IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Emergency = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showAddContactPopup, setShowAddContactPopup] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState([
    { name: 'Dra. Donna', phone: '123-456-7890', image: 'https://via.placeholder.com/50' },
    { name: 'John Doe', phone: '123-456-7890', image: 'https://via.placeholder.com/50' },
    { name: 'Jane Smith', phone: '987-654-3210', image: 'https://via.placeholder.com/50' },
  ]);

  const handleSOSClick = () => {
    alert('Please standby, we are currently requesting for help.');
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleAddContactPopup = () => {
    setShowAddContactPopup(!showAddContactPopup);
  };

  const handleAddContact = () => {
    if (name && phone) {
      setContacts([...contacts, { name, phone, image: 'https://via.placeholder.com/50' }]);
      setName('');
      setPhone('');
      toggleAddContactPopup();
    } else {
      alert('Please fill out both fields.');
    }
  };

  return (
    <div className="emergency-container">
      <div className="emergency-nav-bar">
        <Link to="/app" className="emergency-back-button">
          <IoArrowBack />
        </Link>
        <button className="emergency-settings-button" onClick={togglePopup}>
          <IoSettingsOutline />
        </button>
      </div>
      <div className="emergency-content">
        <div className="emergency-sos-button-container">
          <button className="emergency-sos-button" onClick={handleSOSClick}>SOS</button>
        </div>
        <div className="emergency-sos-description">
          <p>After pressing the SOS button, we will contact all the people listed in your emergency contacts.</p>
        </div>
      </div>

      {/* Popup Container */}
      {showPopup && (
        <div className="emergency-popup-overlay">
          <div className="emergency-popup-list-container">
            <button className="emergency-close-button" onClick={togglePopup}>
              <IoClose />
            </button>
            <button className="emergency-add-contact-button" onClick={toggleAddContactPopup}>
              +
            </button>
            <h2>Emergency Contact</h2>
            <div className="emergency-consul-divider"></div>
            <div className="emergency-contact-list">
              {contacts.map((contact, index) => (
                <div className="emergency-contact-item" key={index}>
                  <img src={contact.image} alt={contact.name} className="emergency-contact-image" />
                  <div className="emergency-contact-details">
                  <div className="emergency-contact-name">{contact.name}</div>
                  <div className="emergency-contact-phone">{contact.phone}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Popup */}
      {showAddContactPopup && (
        <div className="emergency-popup-overlay">
          <div className="emergency-popup-content">
            <button className="emergency-close-button1" onClick={toggleAddContactPopup}>
              <IoClose />
            </button>
            <h2>Add New Contact</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddContact();
            }}>
              <div className="emergency-form-group">
                <input
                  type="text"
                  id="contact-name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="emergency-form-group">
                <input
                  type="text"
                  id="contact-phone"
                  placeholder="Contact Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="emergency-save-button">Save Contact</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;
