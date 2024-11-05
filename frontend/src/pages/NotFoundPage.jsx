// src/pages/NotFoundPage.jsx

import React from 'react';
import {Box} from '@mui/material';
import './NotFoundPage.css'; // Ensure the CSS file is in the same directory

const NotFoundPage = () => {
  return (

    <Box
            sx={{
                backgroundColor: '#121212',
                color: '#ffffff',
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center', // Center vertically
                justifyContent: 'center', // Center horizontally
                p: 3,
            }}
      >
    
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
    </Box>
  );
};

export default NotFoundPage;
