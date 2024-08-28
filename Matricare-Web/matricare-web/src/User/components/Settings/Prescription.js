import React, { useState } from 'react';
import '../../styles/settings/prescription.css';
import { IoSearch, IoChevronBackCircle, IoLockClosed, IoMedkit, IoReceipt, IoAddCircleOutline, IoClose, IoArrowForward } from "react-icons/io5";
import { FaPills } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const localizer = momentLocalizer(moment);

const initialPrescriptions = [
  { id: 1, doctor: "Dra. Donna", datePrescribed: "2024-01-01", dateValidity: "2024-02-01", name: "Hydroxyzine", dosage: "500mg", amount: "30", time: "Twice a day" },
  { id: 2, doctor: "Dra. Donna", datePrescribed: "2024-01-05", dateValidity: "2024-03-01", name: "Tylenol", dosage: "250mg", amount: "60", time: "Once a day" },
  { id: 3, doctor: "Dra. Donna", datePrescribed: "2024-01-10", dateValidity: "2024-04-01", name: "Mucinex ", dosage: "100mg", amount: "90", time: "Thrice a day" },
  { id: 4, doctor: "Dra. Donna", datePrescribed: "2024-01-01", dateValidity: "2024-02-01", name: "Zyrtec", dosage: "500mg", amount: "30", time: "Twice a day" },
  { id: 5, doctor: "Dra. Donna", datePrescribed: "2024-01-05", dateValidity: "2024-03-01", name: "Hydroxyzine", dosage: "250mg", amount: "60", time: "Once a day" },
  { id: 6, doctor: "Dra. Donna", datePrescribed: "2024-01-10", dateValidity: "2024-04-01", name: "Claritin", dosage: "100mg", amount: "90", time: "Thrice a day" }
];



const OnlinePrescription = () => {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPillOrganizer, setShowPillOrganizer] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [medicineDosage, setMedicineDosage] = useState('');
  const [medicineTime, setMedicineTime] = useState('');
  const [dateFrom, setDateFrom] = useState(null); 
  const [dateTo, setDateTo] = useState(null);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [medicinesForSelectedDate, setMedicinesForSelectedDate] = useState([]);
  const [showAlarmForm, setShowAlarmForm] = useState(false);
  const [selectedMedicineForAlarm, setSelectedMedicineForAlarm] = useState(null);
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmNote, setAlarmNote] = useState('');
  const [reminderTime, setReminderTime] = useState('once');
  const [startDate, setStartDate] = useState('today');
  const [daysFrequency, setDaysFrequency] = useState('everyday');
  const [duration, setDuration] = useState('1-week');
  const [alarmEnabled, setAlarmEnabled] = useState(true);



  const handleAddSchedule = () => {
    setShowForm(true);
  };

  const togglePopup = () => {
    setShowForm(false); // Close the form popup
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateFrom || !dateTo) return; // Ensure dates are set
  
    const newMedicine = { 
      title: medicineName,
      start: new Date(dateFrom), 
      end: new Date(dateTo), 
      dosage: medicineDosage, 
      time: medicineTime 
    };
  
    setEvents(prevEvents => [...prevEvents, newMedicine]);
    setMedicinesForSelectedDate(prevMedicines => [...prevMedicines, newMedicine]);
    setShowForm(false);
    setMedicineName('');
    setMedicineDosage('');
    setMedicineTime('');
    setDateFrom(null);
    setDateTo(null);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === 'securePassword123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleArrowClick = (medicine) => {
    setSelectedMedicineForAlarm(medicine);
    setShowAlarmForm(true);
  };
  

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, 'MM/dd/yyyy');
    
    const medicines = events.filter(event => 
      date >= new Date(event.start) && date <= new Date(event.end)
    );
    
    setMedicinesForSelectedDate(medicines);
  };

  const handleSearch = (searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();
    const filteredPrescriptions = initialPrescriptions.filter((prescription) =>
      prescription.name.toLowerCase().includes(searchTermLower)
    );
    setPrescriptions(filteredPrescriptions);
  };

  const handlePillOrganizerClick = () => {
    setShowPillOrganizer(true);
  };

  const handlePrescriptionClick = () => {
    setShowPillOrganizer(false);
  };

  const handleView = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const handleCloseModal = () => {
    setSelectedPrescription(null);
  };

  const handleAlarmSubmit = (e) => {
    e.preventDefault();
    if (alarmTime) {
      // You can integrate an alarm or notification system here
      console.log(`Alarm set for ${selectedMedicineForAlarm.title} at ${alarmTime}`);
      setShowAlarmForm(false); // Close the form after setting the alarm
      setAlarmTime('');
    }
  };
  

  return (
    <div className="online-prescription-container">
      {!isAuthenticated ? (
        <div className="online-prescription-password-container">
          <div className="background-image-medical" style={{ backgroundImage: `url('/img/bg6.jpg')` }}></div>
          <div className="overlay"></div>
          <Link to="/app" className="back-button-prescription1"><IoChevronBackCircle /></Link>
          <div className="left-section">
            <div className="lock-icon">
              <IoLockClosed />
              <p>MatriCare</p>
            </div>
          </div>
          <h3 className="password-title">Enter Password</h3>
          <form onSubmit={handlePasswordSubmit} className="online-prescription-password-form">
            <div className="password-input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="online-prescription-button">Submit</button>
            </div>
          </form>
          {error && <p className="online-prescription-error">{error}</p>}
        </div>
      ) : (
        <div className="online-prescription-main-content">
          <div className="online-prescription-nav">
            <img src="/img/logo3.png" alt="Logo" className="logo-image-prescription" />
            <div className='OP-nav'>
              <div className="OP-nav-button" onClick={handlePillOrganizerClick}>
                <IoMedkit className="OP-nav-icon" />
                Pill Organizer
              </div>
              <div className="OP-nav-button" onClick={handlePrescriptionClick}>
                <IoReceipt className="OP-nav-icon" />
                Prescriptions
              </div>
            </div>
          </div>

          {showPillOrganizer ? (
            <div className="pill-organizer-content">
              <div className="schedule-header">
                <h2 className="schedule-label">SCHEDULE</h2>
                <button className="PO-add-button" onClick={handleAddSchedule}><IoAddCircleOutline /></button>
              </div>
              {showForm && (
                <div className="PO-schedule-form-popup">
                 <button className="PO-close-button" onClick={() => setShowForm(false)}>
                  <IoClose />
                </button>
                  <h2>Medicine Tracker</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="PO-form-group">
                      <input
                        className="PO-form-input"
                        type="text"
                        id="medicineName"
                        placeholder=" "
                        value={medicineName}
                        onChange={(e) => setMedicineName(e.target.value)}
                        required
                      />
                      <label htmlFor="medicineName" className="PO-form-label">Medicine Name:</label>
                    </div>
                    <div className="PO-form-group">
                      <input
                        className="PO-form-input"
                        type="text"
                        id="medicineDosage"
                        placeholder=" "
                        value={medicineDosage}
                        onChange={(e) => setMedicineDosage(e.target.value)}
                        required
                      />
                      <label htmlFor="medicineDosage" className="PO-form-label">Dosage:</label>
                    </div>
                    <div className="PO-form-group">
                      <input
                        className="PO-form-input"
                        type="text"
                        id="medicineTime"
                        placeholder=" "
                        value={medicineTime}
                        onChange={(e) => setMedicineTime(e.target.value)}
                        required
                      />
                      <label htmlFor="medicineTime" className="PO-form-label">Time:</label>
                    </div>
                    <div className="PO-form-group">
                      <DatePicker
                        id="dateFrom"
                        selected={dateFrom}
                        onChange={(date) => setDateFrom(date)}
                        className="PO-form-input"
                        dateFormat="MM/dd/yyyy"
                        placeholderText=""
                        required
                      />
                  <label htmlFor="dateFrom" className={dateFrom ? 'PO-form-label filled' : 'PO-form-label'}>Date From:</label>
                  </div>
                  <div className="PO-form-group">
                      <DatePicker
                        id="dateTo"
                        selected={dateTo}
                        onChange={(date) => setDateTo(date)}
                        className="PO-form-input"
                        dateFormat="MM/dd/yyyy"
                        placeholderText=""
                        required
                      />
                 <label htmlFor="dateTo" className={dateTo ? 'PO-form-label filled' : 'PO-form-label'}>Date To:</label>
                   </div>
                    <button type="submit" className="PO-form-submit">Add Medicine</button>
                  </form>
                </div>
              )}
            {/* Calendar Component */}
            <div className="prescription-calendar-container">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, margin: "20px 0" }}
              onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)}
              selectable
            />
              </div>
              <div className="medicine-tracker">
                  {selectedDate && (
                    <>
                     <h3 className="medicine-reminder-header">
                      Medicine Reminder for {format(selectedDate, 'MM/dd/yyyy')}
                    </h3>
                    <ul className="medicine-reminder-list">
                      {medicinesForSelectedDate.length === 0 ? (
                        <li className="medicine-reminder-item">No medicines scheduled for this date.</li>
                      ) : (
                        medicinesForSelectedDate.map((medicine, index) => (
                          <li className="medicine-reminder-item" key={index}>
                             <FaPills className="medicine-icon" />
                              <div className="medicine-details">
                                <p className="medicine-title">{medicine.title}</p>
                                <p className="medicine-time">{medicine.time}</p>
                              </div>
                            <button className="medicine-arrow-button" onClick={() => handleArrowClick(medicine)}>
                              <IoArrowForward />
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                    </>
                  )}
                </div>
                <div className="medicine-info-container">
                <h2>Medicines for Selected Date</h2>
                <ul>
                  {medicinesForSelectedDate.map((medicine, index) => (
                    <li key={index}>
                      <div className="medicine-title1">{medicine.title}</div>
                      <button onClick={() => handleArrowClick(medicine)}>Set Alarm</button>
                    </li>
                  ))}
                </ul>
              </div>

              {showAlarmForm && (
  <div className="alarm-form">
    <h3>Set Alarm for {selectedMedicineForAlarm?.title || 'Select Medicine'}</h3>
    <form onSubmit={handleAlarmSubmit}>

    <div className="reminder-times-container">
    <div className="form-group-container">
        <div className="form-group">
          <h4>Reminder Times</h4>
          <select
          className="time-select"
            id="reminder-time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          >
            <option value="once">Once</option>
            <option value="twice">Twice</option>
            <option value="thrice">Thrice</option>
          </select>
        </div>
      </div>
      </div>

      <div className="alarm-settings-container">
      <div className="form-group-container1">
        <div className="form-group">
          <h4>Start</h4>
          <select
          className="time-select"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="choose">Choose a day</option>
          </select>
        </div>

        <div className="form-group">
          <h4>Days</h4>
          <select
          className="time-select"
            id="days-frequency"
            value={daysFrequency}
            onChange={(e) => setDaysFrequency(e.target.value)}
          >
            <option value="everyday">Everyday</option>
            <option value="once-a-day">Once a day</option>
          </select>
        </div>

        <div className="form-group">
          <h4>Duration</h4>
          <select
          className="time-select"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="1-week">1 Week</option>
            <option value="1-month">1 Month</option>
            <option value="2-months">2 Months</option>
          </select>
        </div>

        <div className="form-group">
          <h4>Alarm</h4>
          <label className="switch">
            <input
              type="checkbox"
              checked={alarmEnabled}
              onChange={(e) => setAlarmEnabled(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        </div>

        <button type="submit" className="alarm-form-submit-button">Set Alarm</button>
      </div>
    </form>
  </div>
)}



            </div>
          ) : (
            <div className="online-prescription-content">
              <div className="online-prescription-header-container" style={{ backgroundImage: "url('img/bg5.jpg')" }}>
                <Link to="/app" className="back-button-prescription"><IoChevronBackCircle /></Link>
                <h2 className="prescription-title1">MEDICAL</h2>
                <h1 className="prescription-title">Prescription</h1>
                <div className="search-bar">
                  <IoSearch className="search-icon-prescription" />
                  <input
                    type="text"
                    placeholder="Search Medicine..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      handleSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="online-prescription-table-container">
                <table className="online-prescription-table">
                  <thead>
                    <tr>
                      <th>Doctor Profile</th>
                      <th>Date Prescribed</th>
                      <th>Date of Validity</th>
                      <th>Medicine Name</th>
                      <th>Dosage</th>
                      <th>Amount</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((prescription) => (
                      <tr key={prescription.id}>
                        <td>{prescription.doctor}</td>
                        <td>{prescription.datePrescribed}</td>
                        <td>{prescription.dateValidity}</td>
                        <td>{prescription.name}</td>
                        <td>{prescription.dosage}</td>
                        <td>{prescription.amount}</td>
                        <td>{prescription.time}</td>
                        <td>
                          <button
                            className="online-prescription-edit-button"
                            onClick={() => handleView(prescription)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedPrescription && (
        <div className="prescription-modal">
          <div className="prescription-modal-content">
          <div className="prescription-modal-body">
          <span className="prescription-close-button" onClick={handleCloseModal}>
              &times;
            </span>   
          <img src="img/prescription.png" alt="Result" className="prescription-image" />
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default OnlinePrescription;
