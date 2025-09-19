import React, { useState, useEffect } from 'react';
import styles from './FeedbackDisplay.module.css';

interface FeedbackItem {
  id: number;
  title: string;
  body: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  html_url: string;
  reactions: {
    '+1': number;
    '-1': number;
    heart: number;
  };
}

export default function FeedbackDisplay() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      // Fetch issues with 'feedback' label from the past week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const response = await fetch(
        `https://api.github.com/repos/simwilso/Gippsland-Open-Strategy/issues?labels=feedback&state=open&since=${oneWeekAgo.toISOString()}&per_page=10&sort=created&direction=desc`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      
      const issues = await response.json();
      setFeedback(issues);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const extractFeedbackContent = (body: string) => {
    // Extract the actual feedback from the issue body
    const lines = body.split('\n');
    const feedbackStart = lines.findIndex(line => line === '---') + 1;
    const feedbackEnd = lines.findIndex((line, index) => index > feedbackStart && line === '---');
    
    if (feedbackStart > 0 && feedbackEnd > feedbackStart) {
      return lines.slice(feedbackStart, feedbackEnd).join('\n').trim();
    }
    return body;
  };

  const extractPageName = (body: string) => {
    const pageMatch = body.match(/\*\*Page\*\*: (.+)/);
    return pageMatch ? pageMatch[1] : 'Unknown Page';
  };

  if (loading) {
    return (
      <div className={styles.feedbackContainer}>
        <h2>This Week's Community Feedback</h2>
        <div className={styles.loading}>Loading feedback...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.feedbackContainer}>
        <h2>This Week's Community Feedback</h2>
        <div className={styles.error}>Unable to load feedback at this time.</div>
      </div>
    );
  }

  if (feedback.length === 0) {
    return (
      <div className={styles.feedbackContainer}>
        <h2>This Week's Community Feedback</h2>
        <div className={styles.empty}>
          No feedback submitted this week yet. Be the first to share your thoughts!
        </div>
      </div>
    );
  }

  return (
    <section className={styles.feedbackSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>This Week's Community Feedback</h2>
        <p className={styles.sectionSubtitle}>
          Recent suggestions and comments from our community. React with 👍 or 👎 on GitHub to vote!
        </p>
        
        <div className={styles.feedbackGrid}>
          {feedback.map((item) => {
            const feedbackText = extractFeedbackContent(item.body);
            const pageName = extractPageName(item.body);
            
            return (
              <div key={item.id} className={styles.feedbackCard}>
                <div className={styles.feedbackHeader}>
                  <span className={styles.pageName}>{pageName}</span>
                  <span className={styles.date}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className={styles.feedbackContent}>
                  {feedbackText.length > 200 
                    ? `${feedbackText.substring(0, 200)}...` 
                    : feedbackText}
                </div>
                
                <div className={styles.feedbackFooter}>
                  <div className={styles.reactions}>
                    {item.reactions['+1'] > 0 && (
                      <span className={styles.reaction}>👍 {item.reactions['+1']}</span>
                    )}
                    {item.reactions['-1'] > 0 && (
                      <span className={styles.reaction}>👎 {item.reactions['-1']}</span>
                    )}
                    {item.reactions.heart > 0 && (
                      <span className={styles.reaction}>❤️ {item.reactions.heart}</span>
                    )}
                  </div>
                  
                  <a 
                    href={item.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewLink}
                  >
                    View & Vote →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className={styles.feedbackActions}>
          <a 
            href="https://github.com/simwilso/Gippsland-Open-Strategy/issues?q=is%3Aissue+is%3Aopen+label%3Afeedback"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewAllLink}
          >
            View All Feedback on GitHub →
          </a>
          
          <p className={styles.aiNote}>
            📤 This feedback table is automatically processed by our AI team each week
          </p>
        </div>
      </div>
    </section>
  );
}