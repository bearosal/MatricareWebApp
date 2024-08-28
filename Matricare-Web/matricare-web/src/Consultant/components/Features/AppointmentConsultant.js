import React from 'react';
import '../../styles/features/appointmentconsultant.css';
import { IoHome, IoCalendar, IoDocumentText, IoChatbubbles, IoLibrary, IoAddCircleOutline, IoNotifications  } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const appointments = [
  {
    date: "Sept 20, 10 am",
    patientName: "Ella Cruz",
    location: "Mary Chiles",
    category: "Advice by the Doctor"
  },
  {
    date: "Sept 22, 1 pm",
    patientName: "Mary Andres",
    location: "Grace Medical Center",
    category: "Monthly Check-up"
  },
  {
    date: "Sept 24, 3 pm",
    patientName: "Sarah Smith",
    location: "Family Care Tungko",
    category: "Monthly Check-up"
  },
  // Add more appointment objects as needed
];

const AppointmentConsultant = () => {
  return (
    <div className="appointmentConsultant-dashboard">
      <aside className="appointmentConsultant-sidebar">
        <div className="appointmentConsultant-logo">
          <img src="img/logo_consultant.png" alt="Matricare Logo" />
        </div>
        <nav className="appointmentConsultant-nav">
        <Link to="/consultant-landing" className="appointmentConsultant-navItem">
            <IoHome />
          </Link>
          <Link to="/consultant-appointment" className="appointmentConsultant-navItem">
            <IoCalendar />
          </Link>
          <Link to="/library" className="appointmentConsultant-navItem">
            <IoLibrary  />
          </Link>
          <Link to="/consultant-records" className="appointmentConsultant-navItem">
            <IoDocumentText />
          </Link>
          <Link to="/belly-talk" className="appointmentConsultant-navItem">
            <IoChatbubbles />
          </Link>
        </nav>
      </aside>

      <main className="appointmentConsultant-main">
        <header className="appointmentConsultant-header">
        <div className="appointmentConsultant-notificationIcon">
            <IoNotifications />
          </div>
          <div className="appointmentConsultant-headerUser">
            <h1>Dra. Donna Jill Tungol</h1>
            <p>Obstetrician-gynecologist</p>
          </div>
          <div className="appointmentConsultant-headerImage">
            <img src="img/LOGO.png" alt="Profile" />
          </div>
        </header>

        <div className="appointmentConsultant-breadcrumb">
          <a href="#doctor">Doctor</a> <span>&gt;</span> <a href="#appointments" className="breadcrumb-active">Appointments</a>
        </div>

        <div className="appointmentConsultant-content">
          <section className="appointmentConsultant-appointments">
            <div className="appointmentConsultant-tabs">
              <button className="appointmentConsultant-tab active">Upcoming Appointments</button>
              <button className="appointmentConsultant-tab">Post Appointments</button>
            </div>
            <button className="appointmentConsultant-addAppointmentBtn">
              <IoAddCircleOutline /> Add Appointment
            </button>
            <div className="appointmentConsultant-appointmentList">
              {appointments.map((appointment, index) => (
                <div key={index} className="appointmentConsultant-appointmentItem">
                  <div className="appointmentConsultant-detail">
                    <div className="appointmentConsultant-detailContent">
                      <span className="appointmentConsultant-label">Date:</span>
                      <span className="appointmentConsultant-text">{appointment.date}</span>
                    </div>
                  </div>
                  <div className="appointmentConsultant-detail">
                    <div className="appointmentConsultant-detailContent">
                      <span className="appointmentConsultant-label">Patient Name:</span>
                      <span className="appointmentConsultant-text">{appointment.patientName}</span>
                    </div>
                  </div>
                  <div className="appointmentConsultant-detail">
                    <div className="appointmentConsultant-detailContent">
                      <span className="appointmentConsultant-label">Location:</span>
                      <span className="appointmentConsultant-text">{appointment.location}</span>
                    </div>
                  </div>
                  <div className="appointmentConsultant-detail">
                    <div className="appointmentConsultant-detailContent">
                      <span className="appointmentConsultant-label">Category:</span>
                      <span className="appointmentConsultant-text">{appointment.category}</span>
                    </div>
                  </div>
                  <div className="appointmentConsultant-action">
                    <select className="appointmentConsultant-statusSelect">
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="rescheduled">Rescheduled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AppointmentConsultant;
