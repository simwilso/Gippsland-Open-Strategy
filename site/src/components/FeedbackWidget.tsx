import React, { useState } from 'react';
import styles from './FeedbackWidget.module.css';

export default function FeedbackWidget({ pageTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create feedback entry
    const feedbackEntry = {
      id: `feedback-${Date.now()}`,
      page: pageTitle,
      url: window.location.href,
      submittedBy: email || 'Anonymous',
      date: new Date().toISOString(),
      content: feedback,
      votes: {
        up: 0,
        down: 0
      }
    };
    
    // Get existing feedback from localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('communityFeedback') || '[]');
    
    // Add new feedback to beginning of array
    const updatedFeedback = [feedbackEntry, ...existingFeedback];
    
    // Save to localStorage
    localStorage.setItem('communityFeedback', JSON.stringify(updatedFeedback));
    
    // Trigger a custom event to update the display
    window.dispatchEvent(new Event('feedbackUpdated'));
    
    setSubmitted(true);
    
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setFeedback('');
      setEmail('');
    }, 2000);
  };

  return (
    <>
      <button 
        className={styles.feedbackButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Provide feedback"
      >
        💬 Feedback
      </button>
      
      {isOpen && (
        <div className={styles.feedbackModal}>
          <div className={styles.feedbackContent}>
            <button 
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close feedback form"
            >
              ×
            </button>
            
            <h3>Share Your Feedback</h3>
            <p className={styles.documentInfo}>
              <strong>📄 Document:</strong> {pageTitle || 'Current Page'}
            </p>
            <p>Your feedback will be displayed on the homepage for community discussion</p>
            
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <textarea
                  className={styles.feedbackTextarea}
                  placeholder="What would you like us to know about this page?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  rows={5}
                />
                
                <input
                  className={styles.emailInput}
                  type="text"
                  placeholder="Name (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <div className={styles.buttonGroup}>
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                  >
                    Submit Feedback
                  </button>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className={styles.successMessage}>
                ✅ Thank you! Your feedback has been posted.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}