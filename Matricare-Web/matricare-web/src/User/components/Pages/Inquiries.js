import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import "../../styles/pages/inquiries.css"; 

export default function Inquiries() {
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleContainerClick = (inquiry) => {
    setSelectedInquiry(inquiry);
  };

  const getContent = (inquiry) => {
    switch (inquiry) {
      case 1:
        return (
          <div>
            <h2>Inquiry 1 - Apple</h2>
            <p>Content for Inquiry 1: Apple</p>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Inquiry 2 - Banana</h2>
            <p>Content for Inquiry 2: Banana</p>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Inquiry 3 - Orange</h2>
            <p>Content for Inquiry 3: Orange</p>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Inquiry 4 - Grapes</h2>
            <p>Content for Inquiry 4: Grapes</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="inquiries-container">
      <div>
        <h2>Frequently Asked Questions (FAQ)</h2>
        <h3>About MatriCare</h3>
      </div>
      <div className="inquiry-row">
        <div
          className={`inquiry-container ${selectedInquiry === 1 ? "selected" : ""}`}
          onClick={() => handleContainerClick(1)}
        >
          <a className="circle-inquiry"><FaQuestionCircle className="question" /></a>
          <h2>What exactly is MatriCare?</h2>
        </div>
        <div
          className={`inquiry-container ${selectedInquiry === 2 ? "selected" : ""}`}
          onClick={() => handleContainerClick(2)}
        >
           <a className="circle-inquiry"><FaQuestionCircle className="question" /></a>
           <h2>What exactly is MatriCare?</h2>
        </div>
        <div
          className={`inquiry-container ${selectedInquiry === 3 ? "selected" : ""}`}
          onClick={() => handleContainerClick(3)}
        >
           <a className="circle-inquiry"><FaQuestionCircle className="question" /></a>
           <h2>What exactly is MatriCare?</h2>
        </div>
        <div
          className={`inquiry-container ${selectedInquiry === 4 ? "selected" : ""}`}
          onClick={() => handleContainerClick(4)}
        >
           <a className="circle-inquiry"><FaQuestionCircle className="question" /></a>
           <h2>What exactly is MatriCare?</h2>
        </div>
      </div>
      <div className="content-container">{getContent(selectedInquiry)}</div>
    </div>
  );
}
