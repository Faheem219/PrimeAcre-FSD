// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link to="/">Go back to home</Link>
    </div>
  );
}

export default NotFoundPage;
