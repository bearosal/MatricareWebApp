import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch, IoChevronBackCircle, IoAlbumsOutline, IoClipboardOutline, IoLockClosed, IoAdd, IoClose  } from "react-icons/io5";
import '../../styles/settings/medicalrec.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const MedicalRec = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(""); 
  const [activeTable, setActiveTable] = useState('medical-history');
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [editingNote, setEditingNote] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [dateIssued, setDateIssued] = useState('');
  const [laboratoryTest, setLaboratoryTest] = useState('');
  const [result, setResult] = useState('');
  const [diagnosis, setDiagnosis] = useState(''); // Add diagnosis state
  const [laboratoryRecords, setLaboratoryRecords] = useState([]);
  const [resultFile, setResultFile] = useState(null);
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResultFile({
        file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const correctPassword = "securePassword123"; 

  const handleLogin = (event) => {
    event.preventDefault();
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      setError("Incorrect password. Please try again."); 
    }
  };

  const handleSearch = (searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();
  };

  const handleViewAssessment = (assessment) => {
    setShowImageModal(true);
  };

  const handleViewLabRecord = (record) => {
    setShowImageModal(true);
  };
  
  const handleCloseModal = () => {
    setShowImageModal(false);
  };

  const handleOpenAddNoteModal = () => {
    setShowAddNoteModal(true);
  };

  const handleCloseAddNoteModal = () => {
    setShowAddNoteModal(false);
  };

  const handleSaveNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote]);
      setNewNote('');
      setShowAddNoteModal(false);
    }
  };

  const handleEditNote = (index) => {
    setEditingNoteIndex(index);
    setEditingNote(notes[index]);
  };

  const handleSaveEditedNote = () => {
    const updatedNotes = [...notes];
    updatedNotes[editingNoteIndex] = editingNote;
    setNotes(updatedNotes);
    setEditingNoteIndex(null);
    setEditingNote('');
  };

  const handleCancelEdit = () => {
    setEditingNoteIndex(null);
    setEditingNote('');
  };

  const handleAddRecord = (event) => {
    event.preventDefault();
    // Validate inputs
    if (!dateIssued) {
      console.error("Date issued is required");
      return;
    }

    const resultWithFile = resultFile ? `<a href="${resultFile.url}" target="_blank" rel="noopener noreferrer">View File: ${resultFile.file.name}</a>` : result;
    // Add the new record to the list
    setLaboratoryRecords([
      ...laboratoryRecords,
      { dateIssued, laboratoryTest, result: resultWithFile, diagnosis: diagnosis || '', file: resultFile }, // Default to 'N/A' if diagnosis is empty
    ]);
    setShowForm(false);
    // Clear form fields
    setDateIssued('');
    setLaboratoryTest('');
    setResult('');
    setDiagnosis('');
    setResultFile(null); // Clear selected file
  };  

  

  const renderTable = () => {
    switch (activeTable) {
      case 'medical-history':
        return (
          <table className="medical-table">
            <thead>
              <tr>
                <th className="date-column">Date</th>
                <th className="assessment-column">Assessment</th>
                <th className="notes-column">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-05-10</td>
                <td>
                  <button className="medical-view-button" onClick={() => handleViewAssessment("Checkup")}>View</button>
                </td>
                <td>
                  {notes.length > 0 && (
                    <div>
                      {notes.map((note, index) => (
                        <div key={index} className="note-container">
                          {editingNoteIndex === index ? (
                            <div>
                              <textarea
                                value={editingNote}
                                onChange={(e) => setEditingNote(e.target.value)}
                                className="edit-note-textarea"
                              ></textarea>
                              <button className="save-note-button" onClick={handleSaveEditedNote}>Save</button>
                              <button className="cancel-edit-button" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                          ) : (
                            <div>
                              <p className="note-text">{note}</p>
                              <button className="edit-note-button" onClick={() => handleEditNote(index)}>Edit</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {notes.length === 0 && (
                    <div>
                      {showAddNoteModal ? (
                        <div>
                          <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Type your note here..."
                            className="add-note-textarea"
                          ></textarea>
                          <button className="add-note-save-button" onClick={handleSaveNote}>Save</button>
                          <button className="add-note-close-button" onClick={handleCloseAddNoteModal}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={handleOpenAddNoteModal} className="add-note-button">
                          <span>+</span>
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        );
        case 'laboratory-records':
          return (
            <table className="medical-table">
              <thead>
                <tr>
                  <th className="date-issued-column">Date Issued</th>
                  <th className="lab-test-column">Laboratory Test</th>
                  <th className="result-column">Result</th>
                  <th className="diagnosis-column">Diagnosis</th>
                </tr>
              </thead>
              <tbody>
                {laboratoryRecords.map((record, index) => (
                  <tr key={index}>
                    <td>{record.dateIssued}</td>
                    <td>{record.laboratoryTest}</td>
                    <td dangerouslySetInnerHTML={{ __html: record.result }}></td>
                    <td>{record.diagnosis}</td>

                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="medical-record-container" >
      {!authenticated ? (
        <div className="medical-record-password-container">
          <div className="background-image-medical" style={{ backgroundImage: `url('/img/bg6.jpg')` }}></div>
          <div className="overlay"></div>
          <Link to="/app" className="back-button-medical1"><IoChevronBackCircle /></Link>
          <div className="left-section">
            <div className="lock-icon">
              <IoLockClosed />
              <p>MatriCare</p>
            </div>
          </div>
          <h3 className="password-title">Enter Password</h3>
          <form onSubmit={handleLogin} className="medical-record-password-form">
            <div className="password-input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="medical-record-button">Submit</button>
            </div>
          </form>
          {error && <p className="medical-record-error">{error}</p>}
        </div>
      ) : (
        <div className="medical-record-main-content" style={{
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
            opacity: 0.3,
            zIndex: -1, // Ensure the background is behind all other content
          }} />
          <div className="medical-record-content">
            <div className="medical-record-header-container" style={{ backgroundImage: "url('img/bg5.jpg')" }}>
              <Link to="/app" className="back-button-medical"><IoChevronBackCircle /></Link>
              <h2 className="medical-record-title">MEDICAL</h2>
              <h1 className="medical-record-title2">RECORDS</h1>
              <div className="medical-search-bar">
                <IoSearch className="search-icon-medical" />
                <input
                  type="text"
                  placeholder="   Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="medical-button-container">
        <div className="medical-button-box">
          <button 
            onClick={() => setActiveTable('medical-history')} 
            className={`medical-button-record ${activeTable === 'medical-history' ? 'active' : ''}`}
          >
            <IoAlbumsOutline className="medical-button-icon" />
            <span className="medical-button-text">Medical History</span>
          </button>
        </div>
        <div className="medical-button-box">
          <button 
            onClick={() => setActiveTable('laboratory-records')} 
            className={`medical-button-record ${activeTable === 'laboratory-records' ? 'active' : ''}`}
          >
            <IoClipboardOutline className="medical-button-icon" />
            <span className="medical-button-text">Laboratory Records</span>
          </button>
        </div>
      </div>
      <div className="medical-table-container">
        <div className="add-record-button" onClick={() => setShowForm(true)}>
          <IoAdd className="add-icon" />
        </div>
        {renderTable()}
      </div>
      {showForm && (
        <div className="add-record-form">
          <button className="MR-close-button" onClick={() => setShowForm(false)}>
                  <IoClose />
                </button>
          <h2>Laboratory Records</h2>
          <form onSubmit={handleAddRecord}>
                <div className="MR-form-group">
                  <DatePicker
                    selected={dateIssued ? new Date(dateIssued) : null}
                    onChange={(date) => setDateIssued(date ? date.toISOString().split('T')[0] : '')}
                    className="MR-form-input"
                    dateFormat="MM/dd/yyyy"
                    placeholderText=""
                    required
                  />
                  <label 
                    htmlFor="date" 
                    className={dateIssued ? 'MR-form-label filled' : 'MR-form-label'}
                  >
                    Date Issued:
                  </label>
                </div>

                <div className="MR-form-group">
                      <input
                        type="text"
                        value={laboratoryTest}
                        onChange={(e) => setLaboratoryTest(e.target.value)}
                        className="MR-form-input"
                        placeholder=" "
                      />
                      <label htmlFor="laboratoryTest" className="MR-form-label">Laboratory Test:</label>
                    </div>

                    <div className="MR-form-group">
                      <input
                        value={result}
                         type="file"
                         accept="image/*, .pdf"
                         onChange={(e) => handleFileChange(e)}
                         className="MR-form-input"
                      />
                      <label htmlFor="result" className="MR-form-label">Result</label>
                    </div>
                
          <button onClick={handleAddRecord}>Add Record</button>
          </form>
        </div>
        
      )}
      {showImageModal && (
        <div className="assessment-modal">
          <div className="assessment-modal-content">
            <div className="assessment-modal-body">
              <img src="img/History.png" alt="Assessment" className="assessment-image" />
              <button className="assessment-close-button" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
      {showImageModal && (
        <div className="result-modal">
          <div className="result-modal-content">
            <div className="result-modal-body">
              <img src="img/History.png" alt="Result" className="result-image" />
              <button className="result-close-button" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
            {showAddNoteModal && (
              <div className="add-note-modal">
                <div className="add-note-modal-content">
                  <div className="add-note-modal-header">
                    <h2>Add Note</h2>
                  </div>
                  <div className="add-note-modal-body">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Type your note here..."
                      className="add-note-textarea"
                    ></textarea>
                    <button className="add-note-close-button" onClick={handleCloseAddNoteModal}>Close</button>
                    <button onClick={handleSaveNote} className="add-note-save-button">Save</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRec;
