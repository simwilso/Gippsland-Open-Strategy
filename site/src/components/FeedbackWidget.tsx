import React, { useState } from 'react';
import styles from './FeedbackWidget.module.css';

export default function FeedbackWidget({ pageTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create issue body with metadata
    const issueBody = `
**Page**: ${pageTitle}
**URL**: ${window.location.href}
**Submitted by**: ${email || 'Anonymous'}
**Date**: ${new Date().toLocaleDateString()}

---

${feedback}

---

*This feedback was submitted via the website feedback form.*
`;

    // Create the GitHub issue via a proxy service or GitHub API
    // For now, we'll use a URL that creates a pre-filled issue
    const issueTitle = `Feedback: ${pageTitle}`;
    const githubNewIssueUrl = `https://github.com/simwilso/Gippsland-Open-Strategy/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=feedback,community`;
    
    // Open in new window
    window.open(githubNewIssueUrl, '_blank');
    
    setSubmitted(true);
    setIsSubmitting(false);
    
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
            <p>Your feedback will be posted publicly for community discussion</p>
            
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
                  placeholder="Name/Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <div className={styles.privacyNote}>
                  <small>
                    Note: Your feedback will be posted publicly on GitHub. 
                    You'll be redirected to GitHub to submit (no account required).
                  </small>
                </div>
                
                <div className={styles.buttonGroup}>
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Preparing...' : 'Submit Feedback'}
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
                ✅ Redirecting to submit your feedback...
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}