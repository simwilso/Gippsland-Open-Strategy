import React, { useState, useEffect } from 'react';
import styles from './FeedbackDisplay.module.css';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

interface FeedbackItem {
  id: string;
  page: string;
  url: string;
  submittedBy: string;
  date: string;
  content: string;
  votes: {
    up: number;
    down: number;
  };
}

export default function FeedbackDisplay() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      loadFeedback();
      
      // Listen for feedback updates
      window.addEventListener('feedbackUpdated', loadFeedback);
      
      return () => {
        window.removeEventListener('feedbackUpdated', loadFeedback);
      };
    }
  }, []);

  const loadFeedback = () => {
    try {
      setLoading(true);
      const storedFeedback = localStorage.getItem('communityFeedback');
      if (storedFeedback) {
        const parsedFeedback = JSON.parse(storedFeedback);
        // Filter to show only feedback from the last 7 days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const recentFeedback = parsedFeedback.filter(item => 
          new Date(item.date) > oneWeekAgo
        );
        
        setFeedback(recentFeedback);
      }
    } catch (err) {
      console.error('Error loading feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = (feedbackId: string, voteType: 'up' | 'down') => {
    const updatedFeedback = feedback.map(item => {
      if (item.id === feedbackId) {
        return {
          ...item,
          votes: {
            ...item.votes,
            [voteType]: item.votes[voteType] + 1
          }
        };
      }
      return item;
    });
    
    setFeedback(updatedFeedback);
    
    // Save all feedback (not just recent) back to localStorage
    const allFeedback = JSON.parse(localStorage.getItem('communityFeedback') || '[]');
    const updatedAllFeedback = allFeedback.map(item => {
      const updated = updatedFeedback.find(f => f.id === item.id);
      return updated || item;
    });
    
    localStorage.setItem('communityFeedback', JSON.stringify(updatedAllFeedback));
  };

  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  if (loading) {
    return (
      <section className={styles.feedbackSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>This Week's Community Feedback</h2>
          <div className={styles.loading}>Loading feedback...</div>
        </div>
      </section>
    );
  }

  if (feedback.length === 0) {
    return (
      <section className={styles.feedbackSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>This Week's Community Feedback</h2>
          <div className={styles.empty}>
            No feedback submitted this week yet. Be the first to share your thoughts!
          </div>
        </div>
      </section>
    );
  }

  const exportFeedback = () => {
    const dataStr = JSON.stringify(feedback, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `feedback-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <section className={styles.feedbackSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>This Week's Community Feedback</h2>
        <p className={styles.sectionSubtitle}>
          Recent suggestions and comments from our community. Click 👍 or 👎 to vote!
        </p>
        
        <div className={styles.feedbackGrid}>
          {feedback.map((item) => (
            <div key={item.id} className={styles.feedbackCard}>
              <div className={styles.feedbackHeader}>
                <span className={styles.pageName}>{item.page}</span>
                <span className={styles.date}>
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              
              <div className={styles.feedbackContent}>
                {item.content}
              </div>
              
              <div className={styles.submittedBy}>
                — {item.submittedBy}
              </div>
              
              <div className={styles.feedbackFooter}>
                <div className={styles.voteButtons}>
                  <button 
                    className={styles.voteButton}
                    onClick={() => handleVote(item.id, 'up')}
                    aria-label="Vote up"
                  >
                    👍 {item.votes.up}
                  </button>
                  <button 
                    className={styles.voteButton}
                    onClick={() => handleVote(item.id, 'down')}
                    aria-label="Vote down"
                  >
                    👎 {item.votes.down}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.feedbackActions}>
          <button 
            onClick={exportFeedback}
            className={styles.exportButton}
          >
            📥 Export This Week's Feedback (JSON)
          </button>
          
          <p className={styles.aiNote}>
            📤 Export this feedback table for AI processing each week
          </p>
        </div>
      </div>
    </section>
  );
}