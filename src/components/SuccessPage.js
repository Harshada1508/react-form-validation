import React from 'react';
import { useLocation } from 'react-router-dom';

function SuccessPage() {
  const location = useLocation();
  const formData = location.state?.formData;

  return (
    <div>
      <h2>Submitted Details</h2>
      <ul>
        {Object.entries(formData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuccessPage;
