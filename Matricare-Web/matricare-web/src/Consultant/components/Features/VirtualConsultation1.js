import React, { useState, useRef, useEffect } from 'react';
import { MdCallEnd, MdMic, MdVideocam, MdMessage, MdCallMissed, MdMicOff, MdVideocamOff, MdArrowForward, MdPeople  } from "react-icons/md";
import '../../styles/features/virtual.css';
import { Link } from 'react-router-dom';
import {IoChevronBackCircle } from 'react-icons/io5';


const VirtualConsultation1 = () => {
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


  return (
    <div className="CV-virtual-consul"style={{
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

    <div className="CV-virtual-consul-left">
            <nav className="CV-virtual-consul-nav">
              <Link to="/consultant-landing" className="CV-back-button-virtualconsul">
                <IoChevronBackCircle />
              </Link>
            </nav>
          </div>

        <div className="CV-virtual-consul-top">
    <div className="CV-in-meeting-container">
    <div className="CV-in-meeting-icon">
  <MdPeople />
</div>
    <label className="CV-in-meeting-label">In Meeting...</label>
  </div>
  <div className="CV-join-meeting-container">
    <label className="CV-join-meeting-label">Join Meeting</label>
    <input
      type="text"
      className="CV-meeting-code-input"
      placeholder="Enter the Meeting Code"
      value={meetingCode}
      onChange={(e) => setMeetingCode(e.target.value)}
    />
    <button className="CV-join-meeting-button" onClick={handleJoinMeeting}>
      <MdArrowForward />
    </button>
  </div>
</div>

      <div className="CV-virtual-consul-main">
        <div className="CV-camera-container">
          <video ref={doctorVideoRef} autoPlay className="CV-doctor-camera" />
          <video ref={userVideoRef} autoPlay className="CV-user-camera" />
          <div className="CV-call-controls">
          <button className="CV-call-mute" onClick={handleToggleMicrophone}>
              {microphoneOn ? <MdMic className="CV-VR-icon" /> : <MdMicOff className="CV-VR-icon" />}
              <span className="CV-VR-label">{microphoneOn ? 'Mute' : 'Unmute'}</span>
            </button>
            <button className="cCV-all-video" onClick={handleShowVideo}>
              {cameraOn ? <MdVideocam className="CV-VR-icon" /> : <MdVideocamOff className="CV-VR-icon" />}
              <span className="CV-VR-label">{cameraOn ? 'Video' : 'No Video'}</span>
            </button>
        <button className="CV-call-message"onClick={handleShowChats}>
          <MdMessage className="CV-VR-icon" />
          <span className="CV-VR-label">Message</span>
        </button>
          </div>
          <button className="CV-call-end" onClick={handleEndCall}>
            <MdCallEnd />
          </button>
          <div className="CV-call-timer">00:45</div>
        </div>
      </div>

      <div className="CV-virtual-consul-right">
        <div className="CV-consultation-options">
        <button className="CV-consultation-option" onClick={handleShowCalls}>
            <span className="CV-VR-label">Calls</span>
          </button>
          <button className="CV-consultation-option" onClick={handleShowChats}>
            <span className="CV-VR-label">Chats</span>
          </button>

        </div>

        <div className="CV-virtual-consul-divider"></div>

        {showCallsContainer && (
          <div className="CV-container-calls">
            <div className="CV-call-entry">
              <div className="CV-profile-image">
                <img src="img/logo3.png" alt="User Profile" />
              </div>
              <div className="CV-call-details">
                <div className="CV-caller-name">
                  Dra. Donna: 11:45 am
                </div>
                <div className="CV-call-end-label">
                  <MdCallEnd className="CV-VR-icon" />
                  <span className="CV-VR-label">This call has ended</span>
                </div>
                <div className="CV-call-duration">
                  Duration: 7 mins 30 secs
                </div>
              </div>
            </div>
            <div className="CV-call-entry">
              <div className="CV-profile-image">
                <img src="img/logo3.png" alt="User Profile" />
              </div>
              <div className="CV-call-details">
                <div className="CV-caller-name">
                  You: 03:30 pm
                </div>
                <div className="CV-call-end-label">
                  <MdCallMissed   className="CV-VR-icon" />
                  <span className="CV-VR-label">Dra. Donna missed the call</span>
                </div>
              </div>
              </div>

              <div className="CV-call-date">June 2024</div>
              <div className="CV-call-date-divider"></div>

              <div className="CV-call-entry">
              <div className="CV-profile-image">
                <img src="img/logo3.png" alt="User Profile" />
              </div>
              <div className="CV-call-details">
                <div className="CV-caller-name">
                Dra. Donna: 02:00 pm
                </div>
                <div className="CV-call-end-label">
                  <MdCallMissed   className="CV-VR-icon" />
                  <span className="label">You missed the call</span>
                </div>
              </div>
              </div>

              <div className="CV-call-entry">
              <div className="CV-profile-image">
                <img src="img/logo3.png" alt="User Profile" />
              </div>
              <div className="CV-call-details">
                <div className="CV-caller-name">
                Dra. Donna: 03:00 pm
                </div>
                <div className="CV-call-end-label">
                  <MdCallEnd className="CV-VR-icon" />
                  <span className="CV-VR-label">This call has ended</span>
                </div>
                <div className="CV-call-duration">
                  Duration: 7 mins 30 secs
                </div>
              </div>
            </div>

          </div>
        )}

{showChatsContainer && (
          <div className="CV-container-chats">
            <div className="CV-chat-messages">
  {chatMessages.map((message, index) => (
    <div key={index} className="CV-chat-message-wrapper">
      {message.time && <span className="CV-message-time">{message.time}</span>}
      <div className={`CV-chat-message ${message.sender.toLowerCase()}`}>
        <span className="CV-message-content">{message.content}</span>
      </div>
    </div>
  ))}
</div>
<div className="CV-divider"></div>
<div className="CV-chat-input">
  <input
    type="text"
    placeholder="Type your message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    className='CV-sent-message'
    onKeyPress={handleKeyPress}
  />
</div>
          </div>
        )}

      </div>
      </div>
  
  );
}

export default VirtualConsultation1;
