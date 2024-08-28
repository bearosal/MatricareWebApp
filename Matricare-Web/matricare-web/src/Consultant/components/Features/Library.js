import React, { useState } from 'react';
import '../../styles/features/library.css';


const books = [
    { id: 1, title: 'First Trimester', author: 'Bea Benella Rosal' },
    { id: 2, title: 'Second Trimester', author: 'Bea Benella Rosal' },
    { id: 3, title: 'Third Trimester', author: 'Bea Benella Rosal' },
    { id: 4, title: 'Weekly Pregnancy', author: 'Bea Benella Rosal' },
    { id: 5, title: 'Pregnancy Symptoms', author: 'Bea Benella Rosal' },
    { id: 6, title: 'Signs of Labor', author: 'Bea Benella Rosal' },
    { id: 7, title: 'Pregnancy Discharge', author: 'Bea Benella Rosal' },
    { id: 8, title: 'Morning Sickness', author: 'Bea Benella Rosal' },
    { id: 9, title: 'Infertility', author: 'Bea Benella Rosal' },
    { id: 10, title: 'Infertility', author: 'Bea Benella Rosal' },
    { id: 11, title: 'Infertility', author: 'Bea Benella Rosal' },
    { id: 12, title: 'Infertility', author: 'Bea Benella Rosal' },

    // Add more books as needed
  ];
  
  const Library = () => {
    const [lastRead, setLastRead] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleBookClick = (book) => {
      setLastRead((prevLastRead) => [book, ...prevLastRead.filter(b => b.id !== book.id)]);
    };
  
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="library-layout">
        <nav className="library-sidebar">
        <div className="library-sidebar-logo"> <img src="img/logo_consultant.png" alt="logo" /> </div>
        </nav>
        <div className="main-content">
          <header className="library-header">
            <div className="header-actions">
              <input
                type="text"
                className="search-bar-library"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="action-button">New Release</button>
              <button className="action-button">Saved</button>
            </div>
          </header>
          
          <section id="last-read" className="last-read-section">
            <h2>Books You Last Read</h2>
            <div className="book-list-container">
              {lastRead.length > 0 ? (
                lastRead.map((book) => (
                  <div key={book.id} className="last-read-item">
                    <div className="book-background">
                    <img src="/img/topic1.jpg" alt="Topic 1" className="book-cover" />
                      <div className="book-details">
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-author">Author: {book.author}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No books read yet.</p>
              )}
            </div>
          </section>
          
          <section id="library" className="library-section">
            <h2>Library</h2>
            <div className="book-list-container">
              {filteredBooks.map((book) => (
                <div className="library-item" onClick={() => handleBookClick(book)}>
                <img src="/img/topic1.jpg" alt={book.title} className="book-cover" />
                <div className="book-details">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">Author: {book.author}</p>
                </div>
              </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default Library;