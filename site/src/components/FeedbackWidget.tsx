import React, { useState } from 'react';
import styles from './FeedbackWidget.module.css';

export default function FeedbackWidget({ pageTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with feedback
    const subject = `Feedback for: ${pageTitle}`;
    const body = `Page: ${pageTitle}
URL: ${window.location.href}

Feedback:
${feedback}

From: ${email || 'Anonymous'}`;
    
    const mailtoLink = `mailto:gnec@virtualaiofficer.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setFeedback('');
      setEmail('');
    }, 3000);
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
            <p>Help us improve this documentation</p>
            
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
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <div className={styles.buttonGroup}>
                  <button type="submit" className={styles.submitButton}>
                    Send Feedback
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
                ✅ Thank you for your feedback!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}