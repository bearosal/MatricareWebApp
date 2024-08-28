import React, { useState, useEffect, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { IoChevronBackCircle, IoLocationSharp, IoTimeSharp, IoArrowBackSharp, IoCloseOutline, IoClipboard,IoCalendarOutline    } from 'react-icons/io5';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/features/appointment.css';

const localizer = momentLocalizer(moment);

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [step, setStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentMode, setAppointmentMode] = useState('');
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const appointmentTypeRef = useRef(null);
  const appointmentModeRef = useRef(null);

  const locationSlots = {
    'Mary Chiles, Manila': {
      'Monday': ['9:00 AM - 9:30 AM', '9:30 AM - 10:00 AM', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:30 AM - 12:00 PM', '1:00 PM - 1:30 PM', '1:30 PM - 2:00 PM', '2:00 PM - 2:30 PM', '2:30 PM - 3:00 PM'],
      'Saturday': ['2:00 PM - 2:30 PM', '2:30 PM - 3:00 PM', '3:00 PM - 3:30 PM', '3:30 PM - 4:00 PM', '4:00 PM - 4:30 PM','4:30 PM - 5:00 PM'],
    },
    'Grace Medical Center': {
      'Tuesday': ['9:00 AM - 9:30 AM', '9:30 AM - 10:00 AM', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:30 AM - 12:00 PM'],
      'Sunday': ['9:00 AM - 9:30 AM', '9:30 AM - 10:00 AM', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:30 AM - 12:00 PM'],
      'Friday': ['3:00 PM - 3:30 PM', '3:30 PM - 4:00 PM', '4:00 PM - 4:30 PM','4:30 PM - 5:00 PM'],
    },
    'Family Care Tungko': {
      'Friday': ['1:00 PM - 1:30 PM', '1:30 PM - 2:00 PM', '2:00 PM - 2:30 PM', '2:30 PM - 3:00 PM', '3:00 PM - 3:30 PM', '3:30 PM - 4:00 PM', '4:00 PM - 4:30 PM','4:30 PM - 5:00 PM'],
      'Saturday': ['9:00 AM - 9:30 AM', '9:30 AM - 10:00 AM', '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:30 AM - 12:00 PM'],
    }
  };


  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever events state changes
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleDateClick = (slotInfo) => {
    const dayOfWeek = moment(slotInfo.start).format('dddd');
    setSelectedDate(slotInfo.start);
    setStep(1);
    setSelectedLocation('');
    setAvailableSlots([]);

    const locations = Object.keys(locationSlots).filter(location => locationSlots[location][dayOfWeek]);

    setAvailableSlots(locations);
  };


  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    const dayOfWeek = moment(selectedDate).format('dddd');
    setAvailableSlots(locationSlots[location][dayOfWeek]);
    setStep(2);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [startHour, startMinute, startAMPM] = selectedSlot.split(/[:\s-]+/);
    const startHour24 = startAMPM === 'PM' && startHour !== '12' ? parseInt(startHour) + 12 : parseInt(startHour);
    const startDate = moment(selectedDate).hour(startHour24).minute(parseInt(startMinute)).toDate();
    const endDate = moment(startDate).add(1, 'hours').toDate();

    const newEvent = {
      id: editingEvent ? editingEvent.id : events.length + 1,
      title: `${appointmentType} with ${fullName} at ${selectedLocation} (${selectedSlot})`,
      start: startDate,
      end: endDate,
    };

    if (editingEvent) {
      setEvents(events.map(event => (event.id === editingEvent.id ? newEvent : event)));
      setEditingEvent(null);
    } else {
      setEvents([...events, newEvent]);
    }

    // Clear form fields after submission
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setAppointmentType('');
    setAppointmentMode('');
    setSelectedSlot('');
    setStep(0);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFullName(event.title.split(' with ')[1].split(' at ')[0]);
    setSelectedLocation(event.title.split(' at ')[1].split(' (')[0]);
    setSelectedSlot(event.title.split('(')[1].split(')')[0]);
    setSelectedDate(event.start);
    setStep(3);
  };

  const handleDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleInputFocus = (event) => {
    const element = event.target;
    if (element && element.tagName) {
      element.parentNode.classList.add('focused');
    }
  };
  
  const handleInputBlur = (event) => {
    const element = event.target;
    if (element && element.tagName) {
      if (!element.value) {
        element.parentNode.classList.remove('focused');
      }
    }
  };
  

  return (
    <div className="appointment-page">


      {/* Navigation bar */}
      <nav className="nav-bar">
        <Link to="/app" className="back-button-appointment"><IoChevronBackCircle /></Link>
        <ul>
          <li></li>
        </ul>
      </nav>

      <div className="appointments-list">
  <div className="info-box"></div>
  <p className="info-text">Bea Rosal</p>
  <h2>Upcoming Appointments</h2>
  {events.map(event => (
    <div className="appointment-item">
    <div className={`circle ${events[0].title === "Monthly Check Up" ? "purple" : "pink"}`}></div>
    <div className="appointment-details">
      <p>{events[0].title}</p>
      <p>{moment(events[0].start).format('MMMM Do YYYY, h:mm a')} - {moment(events[0].end).format('h:mm a')}</p>
    </div>
  </div>
  
  ))}
</div>


      <div className="appointment-schedule">
        <div className="schedule-appointment-container">
          <h3> <IoCalendarOutline className="calendar-icon" /> Schedule an Appointment</h3>
        </div>

        <hr className="horizontal-line" />

        <div className="calendar-outercontainer">
          <div className="calendar-container">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 650 }}
              selectable
              onSelectSlot={handleDateClick}
              onSelectEvent={handleEdit}
            />
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="location-popup" style={{ backgroundImage: 'url("/img/popupBG.png")' }}>
          <IoLocationSharp className="location-icon" />
          <h3>Choose a Branch Location</h3>
          {availableSlots.length > 0 ? (
            availableSlots.map((location, index) => (
              <button key={index} onClick={() => handleLocationSelect(location)}>
                {location}
              </button>
            ))
          ) : (
            <p>No available slots for the selected date.</p>
          )}
          <button onClick={() => setStep(0)}>Back</button>
        </div>
      )}

        {step === 2 && (
          <div className="slots-popup" style={{ backgroundImage: 'url("/img/popupBG.png")' }}>
            <div className="popup-header">
              <IoArrowBackSharp className="back-icon-time" onClick={() => setStep(1)} />
              <button className="icon-cancel-button" onClick={() => setStep(0)}>
                <IoCloseOutline />
              </button>
            </div>
            <IoTimeSharp className="time-icon" />
            <h3>Available Slots</h3>
            <div className="slots-container">
              {availableSlots.map((slot, index) => (
                <button key={index} onClick={() => handleSlotSelect(slot)}>{slot}</button>
              ))}
            </div>
          </div>
        )}



      {step === 3 && (
        <div className="appointment-form-container"style={{ backgroundImage: 'url("/img/popupBG.png")' }}>
          <IoClipboard  className="form-icon" />
          <h3>{editingEvent ? 'Edit Appointment' : 'Book Appointment'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="appointment-form-group">
            <input
              ref={fullNameRef}
              className="appointment-form-input full-name-input"
              type="text"
              id="fullName"
              placeholder=" "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onFocus={(e) => handleInputFocus(e)}
              onBlur={(e) => handleInputBlur(e)}
              required
            />
              <label htmlFor="fullName" className="form-label">Full Name:</label>
            </div>
            <div className="appointment-form-group">
            <input
              ref={emailRef}
              className="appointment-form-input email-input"
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={(e) => handleInputFocus(e)}
              onBlur={(e) => handleInputBlur(e)}
              required
            />
              <label htmlFor="email" className="form-label">Email:</label>
            </div>
            <div className="appointment-form-group">
              <input
                ref={phoneNumberRef}
                className="appointment-form-input"
                type="tel"
                id="phoneNumber"
                placeholder=" "
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onFocus={() => handleInputFocus(phoneNumberRef)}
                onBlur={() => handleInputBlur(phoneNumberRef)}
                required
              />
              <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
            </div>
            <div className="appointment-form-group">
              <select
                ref={appointmentTypeRef}
                id="appointmentType"
                className="appointment-form-select"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                onFocus={() => handleInputFocus(appointmentTypeRef)}
                onBlur={() => handleInputBlur(appointmentTypeRef)}
                required
              >
                <option value="" disabled>Select Appointment Type</option>
        <option value="Monthly Check-up">Monthly Check-up</option>
        <option value="Advice by Doctor">Advice by Doctor</option>
      </select>
              <label htmlFor="appointmentType" className="form-label">Appointment Type:</label>
            </div>
            <div className="appointment-form-group">
              <select
                ref={appointmentModeRef}
                id="appointmentMode"
                className="appointment-form-select"
                value={appointmentMode}
                onChange={(e) => setAppointmentMode(e.target.value)}
                onFocus={() => handleInputFocus(appointmentModeRef)}
                onBlur={() => handleInputBlur(appointmentModeRef)}
                required
              >
                <option value="" disabled>Select Appointment Mode</option>
        <option value="Virtual Consultation">Virtual Consultation</option>
        <option value="Onsite Consultation">Onsite Consultation</option>
      </select>
              <label htmlFor="appointmentMode" className="form-label">Appointment Mode:</label>
            </div>
            <div className="appointment-form-buttons">
              <button type="submit" className="appointment-form-button">{editingEvent ? 'Update' : 'Book Now!'}</button>
              <IoArrowBackSharp className="back-icon-time" onClick={() => setStep(2)} />
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default Appointment;
