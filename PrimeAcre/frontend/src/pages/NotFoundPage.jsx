// src/pages/NotFoundPage.jsx

import React from 'react';
import './NotFoundPage.css'; // Ensure the CSS file is in the same directory

const NotFoundPage = () => {
  return (
    <div className="not-found-body">
      <div className="head">
        <div className="meta"></div>
        <div className="meta"></div>
      </div>
      <div className="message">
        <div className="error-code">404</div>
        <div className="error-text">Got lost? How.....?  why.....?  Ahhhh....</div>
      </div>
    </div>
  );
};

export default NotFoundPage;
