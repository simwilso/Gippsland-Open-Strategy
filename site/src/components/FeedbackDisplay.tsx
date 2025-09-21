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
  const [showAllTime, setShowAllTime] = useState(false);

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      loadFeedback();
      
      // Listen for feedback updates
      window.addEventListener('feedbackUpdated', loadFeedback);
      
      return () => {
        window.removeEventListener('feedbackUpdated', loadFeedback);
      };
    }
  }, [showAllTime]);

  const loadFeedback = () => {
    try {
      setLoading(true);
      const storedFeedback = localStorage.getItem('communityFeedback');
      if (storedFeedback) {
        const parsedFeedback = JSON.parse(storedFeedback);
        
        if (showAllTime) {
          // Show all feedback
          setFeedback(parsedFeedback);
        } else {
          // Filter to show only feedback from the last 7 days
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          
          const recentFeedback = parsedFeedback.filter(item => 
            new Date(item.date) > oneWeekAgo
          );
          
          setFeedback(recentFeedback);
        }
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
          <h2 className={styles.sectionTitle}>
            {showAllTime ? 'All Community Feedback' : 'This Week\'s Community Feedback'}
          </h2>
          <div className={styles.loading}>Loading feedback...</div>
        </div>
      </section>
    );
  }

  if (feedback.length === 0) {
    return (
      <section className={styles.feedbackSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            {showAllTime ? 'All Community Feedback' : 'This Week\'s Community Feedback'}
          </h2>
          <div className={styles.empty}>
            {showAllTime 
              ? 'No feedback submitted yet. Be the first to share your thoughts!'
              : 'No feedback submitted this week yet. Be the first to share your thoughts!'}
          </div>
          {!showAllTime && (
            <button 
              onClick={() => setShowAllTime(true)}
              className={styles.showAllButton}
              style={{ marginTop: '1rem' }}
            >
              Show All Feedback
            </button>
          )}
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

  // Get total feedback count
  const getTotalFeedbackCount = () => {
    try {
      const allFeedback = JSON.parse(localStorage.getItem('communityFeedback') || '[]');
      return allFeedback.length;
    } catch {
      return 0;
    }
  };

  return (
    <section className={styles.feedbackSection}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <h2 className={styles.sectionTitle}>
            {showAllTime ? 'All Community Feedback' : 'This Week\'s Community Feedback'}
          </h2>
          <button 
            onClick={() => setShowAllTime(!showAllTime)}
            className={styles.toggleButton}
            style={{ padding: '0.5rem 1rem', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}
          >
            {showAllTime ? 'Show Recent Only' : `Show All (${getTotalFeedbackCount()} total)`}
          </button>
        </div>
        <p className={styles.sectionSubtitle}>
          {showAllTime 
            ? `All suggestions and comments from our community (${feedback.length} items). Click 👍 or 👎 to vote!`
            : 'Recent suggestions and comments from our community. Click 👍 or 👎 to vote!'}
        </p>
        
        <div className={styles.feedbackGrid}>
          {feedback.map((item) => (
            <div key={item.id} className={styles.feedbackCard}>
              <div className={styles.feedbackHeader}>
                <span className={styles.pageName} title={`From: ${item.url}`}>
                  📄 {item.page || 'Unknown Page'}
                </span>
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
            📥 Export {showAllTime ? 'All' : 'This Week\'s'} Feedback (JSON)
          </button>
          
          <p className={styles.aiNote}>
            📤 Export this feedback table for AI processing each week
          </p>
        </div>
      </div>
    </section>
  );
}