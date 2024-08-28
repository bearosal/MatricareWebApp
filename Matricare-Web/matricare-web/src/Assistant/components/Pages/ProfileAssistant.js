import React, { useState, useEffect } from 'react';
import '../../style/pages/profileassistant.css';
import { PiNotePencilBold } from "react-icons/pi";
import { FaCameraRetro } from "react-icons/fa";

const UserProfile = () => {
  const [fullName, setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');

  useEffect(() => {
    const storedfullName = localStorage.getItem('fullName') || '';
    const storedProfileImageUrl = localStorage.getItem('profileImageUrl') || '';
    setfullName(storedfullName);
    setEmail('example@example.com');
    setAddress('123 Example St, City, Country');
    setPhoneNumber('123-456-7890');
    setProfileImageUrl(storedProfileImageUrl);
    setDateOfBirth('');
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
    localStorage.setItem('address', address);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('dateOfBirth', dateOfBirth);
    setIsEditing(false);
  };

  const handleProfileDelete = () => {
    // Handle profile delete logic here
  };

  return (
    <div className="user-profile-container-background"style={{ backgroundImage: "url('img/login.jpg')" }}>
      <div className="profile-left-container">
        <div className="user-profile-image">
          {profileImageUrl && <img src={profileImageUrl} alt="Profile" className="profile-image" />}
          {isEditing ? (
            <>
              <label htmlFor="profileImage" className="upload-button">
                <FaCameraRetro className="camera-icon" />
              </label>
              <input type="file" id="profileImage" accept="image/*" onChange={handleProfileImageChange} className="file-input" />
            </>
          ) : (
            <button type="button" className="edit-btn" onClick={() => setIsEditing(true)}>
              <PiNotePencilBold /> Edit
            </button>
          )}
          {!isEditing && (
          <div className="authentication">
            <h2>Authentication:</h2>
          </div>
        )}
        </div>
      </div>

      <div className="right-container">
        <h2>User Profile</h2>
        <div className="profile-details">
          {isEditing ? (
            <form onSubmit={handleProfileUpdate}>
              <div className="input-group">
                <label htmlFor="fullName">FULL NAME:</label>
                <div className="full-name-inputs">
                  <input
                    type="text1"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setfullName(e.target.value)}
                    placeholder="Full Name"
                  />
                
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="email">EMAIL:</label>
                <input
                  type="email1"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="input-group">
                <label htmlFor="address">ADDRESS:</label>
                <input
                  type="text1"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              </div>
              <div className="input-group">
                <label htmlFor="phoneNumber">PHONE NUMBER:</label>
                <input
                  type="text1"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                />
              </div>
              <div className="input-group">
                <label htmlFor="dateOfBirth">DATE OF BIRTH:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="button-group">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
            <div>
            <label>FULL NAME:</label>
            <p className="profile-detail">{fullName}</p>
          </div>
          <div>
            <label>EMAIL:</label>
            <p className="profile-detail">{email}</p>
          </div>
          <div>
            <label>ADDRESS:</label>
            <p className="profile-detail">{address}</p>
          </div>
          <div>
            <label>PHONE NUMBER:</label>
            <p className="profile-detail">{phoneNumber}</p>
          </div>
          <div>
            <label>DATE OF BIRTH:</label>
            <p className="profile-detail">{dateOfBirth}</p>
          </div>
        </>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default UserProfile;
