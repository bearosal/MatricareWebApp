import React, { useState, useEffect } from 'react';
import { FaCameraRetro, FaArrowLeft  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/settings/userprofile.css'; // Make sure to update the CSS accordingly

const UserProfile = () => {
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName') || '';
    const storedEmail = localStorage.getItem('email') || '';
    const storedPhoneNumber = localStorage.getItem('phoneNumber') || '';
    const storedProfileImageUrl = localStorage.getItem('profileImageUrl') || '';

    setFullName(storedFullName);
    setEmail(storedEmail);
    setPhoneNumber(storedPhoneNumber);
    setProfileImageUrl(storedProfileImageUrl);

  }, []);

  const handleProfileImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProfileImage(imageFile);
    const imageUrl = URL.createObjectURL(imageFile);
    setProfileImageUrl(imageUrl);
    localStorage.setItem('profileImageUrl', imageUrl);
  };


  const handleProfileUpdate = async (userId) => {
    try {
      const response = await axios.patch(`http://localhost:5005/matricare-web/server/routes/userRoutes/updateprofile/${userId}`, {
        fullName,
        email,
        phoneNumber
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('fullName', data.updatedUser.fullName);
        localStorage.setItem('email', data.updatedUser.email);
        localStorage.setItem('phoneNumber', data.updatedUser.phoneNumber);
        setIsEditing(false);
      } else {
        console.error('Update failed:', response.statusText);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };


  return (
    <div className="user-profile-container">
    <Link to="/app" className="user-profile-back-btn">
        <FaArrowLeft className="user-profile-back-icon" />
      </Link>

      <div className="user-profile-left-container">
      <div className="user-profile-image-section">
        <div className="user-profile-image-header">
          <h3 className="user-profile-image-title">My Profile Picture</h3>
          <p className="user-profile-image-description">Add a photo of you to be easily recognized</p>
        </div>
        {profileImageUrl && <img src={profileImageUrl} alt="Profile" className="user-profile-image" />}
        {isEditing ? (
          <>
            <label htmlFor="profileImage" className="user-profile-upload-button">
              <FaCameraRetro className="user-profile-camera-icon" />
            </label>
            <input type="file" id="profileImage" accept="image/*" onChange={handleProfileImageChange} className="user-profile-file-input" />
          </>
        ) : (
          <button type="button" className="user-profile-edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
      </div>

      <div className="user-profile-right-container">
        <h2>Personal</h2>
        <p>Patient's Information</p>

        <div className="user-profile-divider">
          <span className="UP-divider-text">Personal Details</span>
        </div>
        <div className="user-profile-details">
          {isEditing ? (
            <form onSubmit={() => handleProfileUpdate(userId)}>
              <div className="user-profile-input-group">
                <label htmlFor="fullName">FULL NAME:</label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="user-profile-input"
                />
              </div>
              <div className="user-profile-input-group">
                <label htmlFor="email">EMAIL:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="user-profile-input"
                />
              </div>
              <div className="user-profile-input-group">
                <label htmlFor="phoneNumber">PHONE NUMBER:</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="user-profile-input"
                />
              </div>
              
              <div className="change-pass-divider">
                <span className="CP-divider-text">Password Settings</span>
              </div>

              <div className="user-profile-input-group">
                <label htmlFor="oldPassword">OLD PASSWORD:</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old Password"
                  className="user-profile-input"
                />
              </div>
              <div className="user-profile-input-group">
                <label htmlFor="newPassword">NEW PASSWORD:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="user-profile-input"
                />
              </div>
              <div className="user-profile-input-group">
                <label htmlFor="confirmPassword">CONFIRM PASSWORD:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="user-profile-input"
                />
              </div>

              <div className="user-profile-button-group">
                <button type="submit" className="user-profile-save-btn">Save</button>
                <button type="button" className="user-profile-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
            
          ) : (
            <>
            
             <div className="user-profile-item">
              <label>FULL NAME:</label>
              <p className="user-profile-detail">{fullName}</p>
            </div>
            <div className="user-profile-item">
              <label>EMAIL:</label>
              <p className="user-profile-detail">{email}</p>
            </div>
            <div className="user-profile-item">
              <label>PHONE NUMBER:</label>
              <p className="user-profile-detail">{phoneNumber}</p>
            </div>
            <div className="change-pass-divider">
                <span className="CP-divider-text">Password Settings</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
