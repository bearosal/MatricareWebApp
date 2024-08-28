import React, { useState, useEffect } from 'react';
import '../../styles/settings/consultantprofile.css';
import { PiNotePencilBold } from "react-icons/pi";
import { FaCameraRetro } from "react-icons/fa";

const ConsultantProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName') || '';
    const storedProfileImageUrl = localStorage.getItem('profileImageUrl') || '';
    const storedEmail = localStorage.getItem('email') || '';
    setFullName(storedFullName);
    setEmail(storedEmail);
    setPhoneNumber('123-456-7890');
    setProfileImageUrl(storedProfileImageUrl);
  }, []);

  const handleProfileImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProfileImage(imageFile);
    const imageUrl = URL.createObjectURL(imageFile);
    setProfileImageUrl(imageUrl);
    localStorage.setItem('profileImageUrl', imageUrl);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
    localStorage.setItem('phoneNumber', phoneNumber);
    setIsEditing(false);
  };

  const handleProfileDelete = () => {
    // Handle profile delete logic here
  };

  return (
    <div className="consultant-profile-container-background" style={{ backgroundImage: "url('img/login.jpg')" }}>
      <div className="consultant-profile-left-container">
        <div className="consultant-profile-image">
          {profileImageUrl && <img src={profileImageUrl} alt="Profile" className="consultant-profile-image" />}
          {isEditing ? (
            <>
              <label htmlFor="profileImage" className="consultant-upload-button">
                <FaCameraRetro className="consultant-camera-icon" />
              </label>
              <input type="file" id="profileImage" accept="image/*" onChange={handleProfileImageChange} className="consultant-file-input" />
            </>
          ) : (
            <button type="button" className="consultant-edit-btn" onClick={() => setIsEditing(true)}>
              <PiNotePencilBold /> Edit
            </button>
          )}
          {!isEditing && (
            <div className="consultant-authentication">
              <h2>Authentication:</h2>
            </div>
          )}
        </div>
      </div>

      <div className="consultant-right-container">
        <h2>Consultant Profile</h2>
        <div className="consultant-profile-details">
          {isEditing ? (
            <form onSubmit={handleProfileUpdate}>
              <div className="consultant-input-group">
                <label htmlFor="fullName">FULL NAME:</label>
                <div className="consultant-full-name-inputs">
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                  />
                
                </div>
              </div>
              <div className="consultant-input-group">
                <label htmlFor="email">EMAIL:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="consultant-input-group">
                <label htmlFor="phoneNumber">PHONE NUMBER:</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                />
              </div>
              <div className="consultant-button-group">
                <button type="submit" className="consultant-save-btn">Save</button>
                <button type="button" className="consultant-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div>
                <label>FULL NAME:</label>
                <p className="consultant-profile-detail">{fullName}</p>
              </div>
              <div>
                <label>EMAIL:</label>
                <p className="consultant-profile-detail">{email}</p>
              </div>
              <div>
                <label>PHONE NUMBER:</label>
                <p className="consultant-profile-detail">{phoneNumber}</p>
              </div>
            </>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default ConsultantProfile;
