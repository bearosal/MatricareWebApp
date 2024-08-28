import React from 'react';
import "../../style/pages/landingpageassistant.css"; 
import { IoHome, IoCalendar, IoDocumentText, IoChatbubbles, IoLibrary } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const LandingPageConsultant = () => {
  return (
    <div className="assistant-landingpage-dashboard-container">
      <aside className="assistant-landingpage-sidebar">
        <div className="assistant-landingpage-sidebar-logo">
          <img src="img/logo_consultant.png" alt="logo" />
        </div>
        <div className="assistant-landingpage-sidebar-menu">
          <Link to="/assistant-landing" className="assistant-landingpage-sidebar-item home">
            <IoHome />
          </Link>
          <Link to="/assistant-appointment" className="assistant-landingpage-sidebar-item appointment">
            <IoCalendar />
          </Link>
          <Link to="/library" className="assistant-landingpage-sidebar-item library">
            <IoLibrary />
          </Link>
          <Link to="/belly-talk" className="assistant-landingpage-sidebar-item bellytalk">
            <IoChatbubbles />
          </Link>
        </div>
      </aside>
      
      <main className="assistant-landingpage-main-content">
    <div className="assistant-landingpage-welcome-section">
      <h1>Hello Anna!</h1>
      <p>It's good to see you again.</p>
    </div>

    <div className="assistant-landingpage-courses-section">
      <h3>Patient</h3>
      <div className="assistant-landingpage-course-list">
        <div className="assistant-landingpage-course-item">
          <span className="assistant-landingpage-course-icon">🎨</span>
          <div className="assistant-landingpage-course-details">
            <h4>Learn Figma</h4>
            <p>by Christopher Morgan</p>
          </div>
          <span className="assistant-landingpage-course-duration">6h 30min</span>
          <span className="assistant-landingpage-course-rating">4.9</span>
          <button className="assistant-landingpage-view-course-button">View Patient</button>
        </div>
        {/* Add more courses similarly */}
      </div>
    </div>
  </main>
  
  <aside className="assistant-landingpage-right-sidebar">
    <div className="assistant-landingpage-statistics-container">
      <div className="assistant-landingpage-statistics-section">
        <div className="assistant-landingpage-completed-courses">
          <h2>11</h2>
          <p>Courses completed</p>
        </div>
        <div className="assistant-landingpage-in-progress-courses">
          <h2>4</h2>
          <p>Courses in progress</p>
        </div>
      </div>
      <div className="assistant-landingpage-learning-hours">
        <h3>Your statistics</h3>
        <p>Learning Hours - Weekly</p>
        <div className="assistant-landingpage-graph">
          {/* Add graph components here */}
        </div>
      </div>
    </div>
  </aside>
</div>
  );
};

export default LandingPageConsultant;
