
import React, { useRef, useEffect, useState  } from 'react';
import '../../styles/features/virtualconsul.css';
import { MdCallEnd, MdMic, MdVideocam, MdMessage, MdCallMissed, MdMicOff, MdVideocamOff, MdArrowForward, MdPeople  } from "react-icons/md";
import { Link } from 'react-router-dom';
import {IoChevronBackCircle, IoCall, IoClose, IoPersonCircleOutline  } from 'react-icons/io5';



const VirtualConsul = () => {
  const doctorVideoRef = useRef(null);
  const userVideoRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [showCallsContainer, setShowCallsContainer] = useState(false);
  const [showChatsContainer, setShowChatsContainer] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]); 
  const [meetingCode, setMeetingCode] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Dra. Donna', contactNumber: '123-456-7890' },
    // Add other contacts as needed
  ]);

  useEffect(() => {
    if (cameraOn || microphoneOn) {
      navigator.mediaDevices.getUserMedia({ video: cameraOn, audio: microphoneOn })
        .then((stream) => {
          setMediaStream(stream);
          if (doctorVideoRef.current) {
            doctorVideoRef.current.srcObject = stream;
          }
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing media devices: ", error);
        });
    } else if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
      if (doctorVideoRef.current) {
        doctorVideoRef.current.srcObject = null;
      }
      if (userVideoRef.current) {
        userVideoRef.current.srcObject = null;
      }
    }
  }, [cameraOn, microphoneOn]);

  const handleEndCall = () => {
    // Logic for ending the call
  };

  const handleShowCalls = () => {
    setShowCallsContainer(true);
    setShowChatsContainer(false); // Hide chats container if it's shown
  };

  const handleShowChats = () => {
    setShowChatsContainer(true);
    setShowCallsContainer(false); // Hide calls container if it's shown
  };

  const handleShowVideo = () => {
    setCameraOn((prevState) => !prevState);
  };

  const handleToggleMicrophone = () => {
    setMicrophoneOn((prevState) => !prevState);
  };

  const handleCallClick = () => {
    setShowPopup(true);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const lastMessage = chatMessages[chatMessages.length - 1];
      const showTime = !lastMessage || lastMessage.time !== newMessageTime;

      setChatMessages(prevMessages => [...prevMessages, {
        content: message,
        sender: 'User',
        time: showTime ? newMessageTime : null // Only add time if different
      }]);
      setMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleJoinMeeting = () => {
    // Logic for joining the meeting with the entered meeting code
    console.log('Joining meeting with code:', meetingCode);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setShowAddForm(false); // Close add form when toggling popup
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleAddContact = () => {
    const newContact = {
      id: contacts.length + 1,
      name: name,
      contactNumber: contactNumber,
    };
    setContacts([...contacts, newContact]);
    setName('');
    setContactNumber('');
    setShowAddForm(false); // Close add form after adding contact
  };

  return (
    <div className="virtual-consul"style={{
      position: 'relative',
      zIndex: 0,
    }}>
      <div className="background-image" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/img/appointmentBG.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.5,
        zIndex: -1, // Ensure the background is behind all other content
      }} />

    <div className="virtual-consul-left">
            <nav className="virtual-consul-nav">
              <Link to="/app" className="back-button-virtualconsul">
                <IoChevronBackCircle />
              </Link>
            </nav>
          </div>

  <div className="call-button-container">
    <button className="call-button" onClick={handleCallClick}>
      <IoCall />
    </button>

    {showPopup && (
        <div className="call-popup">
          <div className="popup-header">
            <button className="close-button" onClick={togglePopup}>
              <IoClose />
            </button>
            <button className="add-contact-button" onClick={toggleAddForm}>
              Add Contact
            </button>
          </div>
          <div className="contact-list">
            {contacts.map(contact => (
              <div key={contact.id} className="contact">
                <div className="contact-info">
                  <IoPersonCircleOutline className="contact-icon" />
                  <span>{contact.name}</span>
                </div>
                <button className="call-icon-button">
                  <IoCall />
                </button>
              </div>
            ))}
          </div>
          {showAddForm && (
            <div className="add-contact-form">
               <IoPersonCircleOutline className="add-contact-icon" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={contactNumber}
                onChange={e => setContactNumber(e.target.value)}
              />
              <button onClick={handleAddContact}>Add Contact</button>
            </div>
          )}
        </div>
      )}
    </div>
  

        <div className="virtual-consul-top">
    <div className="in-meeting-container">
    <div className="in-meeting-icon">
  <MdPeople />
</div>
    <label className="in-meeting-label">In Meeting...</label>
  </div>
  <div className="join-meeting-container">
    <label className="join-meeting-label">Join Meeting</label>
    <input
      type="text"
      className="meeting-code-input"
      placeholder="Enter the Meeting Code"
      value={meetingCode}
      onChange={(e) => setMeetingCode(e.target.value)}
    />
    <button className="join-meeting-button" onClick={handleJoinMeeting}>
      <MdArrowForward />
    </button>
  </div>
</div>

      <div className="virtual-consul-main">
        <div className="camera-container">
          <video ref={doctorVideoRef} autoPlay className="doctor-camera" />
          <video ref={userVideoRef} autoPlay className="user-camera" />
          <div className="call-controls">
          <button className="call-mute" onClick={handleToggleMicrophone}>
              {microphoneOn ? <MdMic className="VR-icon" /> : <MdMicOff className="VR-icon" />}
              <span className="VR-label">{microphoneOn ? 'Mute' : 'Unmute'}</span>
            </button>
            <button className="call-video" onClick={handleShowVideo}>
              {cameraOn ? <MdVideocam className="VR-icon" /> : <MdVideocamOff className="VR-icon" />}
              <span className="VR-label">{cameraOn ? 'Video' : 'No Video'}</span>
            </button>
        <button className="call-message"onClick={handleShowChats}>
          <MdMessage className="VR-icon" />
          <span className="VR-label">Message</span>
        </button>
          </div>
          <button className="call-end" onClick={handleEndCall}>
            <MdCallEnd />
          </button>
          <div className="call-timer">00:45</div>
        </div>
      </div>

      <div className="virtual-consul-right">
        <div className="consultation-options">
        <button className="consultation-option" onClick={handleShowCalls}>
            <span className="VR-label">Calls</span>
          </button>
          <button className="consultation-option" onClick={handleShowChats}>
            <span className="VR-label">Chats</span>
          </button>

        </div>

        <div className="virtual-consul-divider"></div>

        {showCallsContainer && (
          <div className="container-calls">
            <div className="call-entry">
              <div className="profile-image">
                <img src="img/logo3.png" alt="User Profile" />
              </div>
              <div className="call-details">
                <div className="caller-name">
                  Dra. Donna: 11:45 am
                </div>
                <div className="call-end-label">
                  <MdCallEnd className="VR-icon" />
                  <span className="VR-label">This call has ended</span>
                </div>
                <div className="call-duration">
                  Duration: 7 mins 30 secs
                </div>
              </div>
            </div>
            <div className="call-entry">
              <div className="profile-image">
                <img src="img/logo3.png" alt="User Profile" />
              </div>
              <div className="call-details">
                <div className="caller-name">
                  You: 03:30 pm
                </div>
                <div className="call-end-label">
                  <MdCallMissed   className="VR-icon" />
                  <span className="VR-label">Dra. Donna missed the call</span>
                </div>
              </div>
              </div>

              <div className="call-date">June 2024</div>
              <div className="call-date-divider"></div>

              <div className="call-entry">
              <div className="profile-image">
                <img src="img/logo3.png" alt="User Profile" />
              </div>
              <div className="call-details">
                <div className="caller-name">
                Dra. Donna: 02:00 pm
                </div>
                <div className="call-end-label">
                  <MdCallMissed   className="VR-icon" />
                  <span className="label">You missed the call</span>
                </div>
              </div>
              </div>

              <div className="call-entry">
              <div className="profile-image">
                <img src="img/logo3.png" alt="User Profile" />
              </div>
              <div className="call-details">
                <div className="caller-name">
                Dra. Donna: 03:00 pm
                </div>
                <div className="call-end-label">
                  <MdCallEnd className="VR-icon" />
                  <span className="VR-label">This call has ended</span>
                </div>
                <div className="call-duration">
                  Duration: 7 mins 30 secs
                </div>
              </div>
            </div>

          </div>
        )}

{showChatsContainer && (
          <div className="container-chats">
            <div className="VR-chat-messages">
  {chatMessages.map((message, index) => (
    <div key={index} className="VR-chat-message-wrapper">
      {message.time && <span className="VR-message-time">{message.time}</span>}
      <div className={`VR-chat-message ${message.sender.toLowerCase()}`}>
        <span className="VR-message-content">{message.content}</span>
      </div>
    </div>
  ))}
</div>
<div className="VR-divider"></div>
<div className="VR-chat-input">
  <input
    type="text"
    placeholder="Type your message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className='VR-sent-message'
    onKeyPress={handleKeyPress}
  />
</div>
          </div>
        )}

      </div>
      </div>
  
  );
}

export default VirtualConsul;