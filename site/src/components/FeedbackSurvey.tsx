import React from 'react';

export default function FeedbackSurvey({ surveyUrl, buttonText = "Take Our Survey" }) {
  return (
    <div style={{
      margin: '20px 0',
      padding: '20px',
      backgroundColor: '#f0f8ff',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h4>📋 Help Us Improve</h4>
      <p>Have 2 minutes? Share your thoughts on this documentation.</p>
      <a 
        href={surveyUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          marginTop: '10px'
        }}
      >
        {buttonText}
      </a>
    </div>
  );
}