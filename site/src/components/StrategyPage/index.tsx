import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import MDXContent from '@theme/MDXContent';
import styles from './styles.module.css';

interface StrategyPageProps {
  title: string;
  description: string;
  content: string;
  githubPath?: string;
  category?: string;
}

export default function StrategyPage({
  title,
  description,
  content,
  githubPath,
  category = 'Strategy'
}: StrategyPageProps): JSX.Element {
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send feedback to a backend
    // For now, we'll create a GitHub issue link with pre-filled content
    const issueTitle = `Feedback on ${title}`;
    const issueBody = `**Document:** ${title}\n**Category:** ${category}\n\n**Feedback:**\n${feedback}`;
    const encodedTitle = encodeURIComponent(issueTitle);
    const encodedBody = encodeURIComponent(issueBody);
    const githubIssueUrl = `https://github.com/simwilso/Gippsland-Open-Strategy/issues/new?title=${encodedTitle}&body=${encodedBody}&labels=feedback,documentation`;
    
    window.open(githubIssueUrl, '_blank');
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 5000);
  };

  return (
    <Layout title={title} description={description}>
      <main className="container margin-vert--lg">
        <div className={styles.strategyHeader}>
          <Link to="/strategy" className={styles.backLink}>
            ← Back to Strategy Overview
          </Link>
          <div className={styles.categoryBadge}>{category}</div>
        </div>

        <article className={styles.strategyContent}>
          <h1>{title}</h1>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          
          <MDXContent>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </MDXContent>
        </article>

        <section className={styles.feedbackSection}>
          <h2>Your Feedback Matters</h2>
          <p>
            This is a living document that benefits from community input. 
            Please share your thoughts, suggestions, or concerns below.
          </p>
          
          <form onSubmit={handleFeedbackSubmit} className={styles.feedbackForm}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What are your thoughts on this strategy? What would you add, change, or remove?"
              required
              className={styles.feedbackTextarea}
            />
            <div className={styles.feedbackActions}>
              <button type="submit" className="button button--primary">
                Submit Feedback via GitHub
              </button>
              {githubPath && (
                <Link
                  to={`https://github.com/simwilso/Gippsland-Open-Strategy/blob/main/${githubPath}`}
                  className="button button--secondary">
                  View on GitHub
                </Link>
              )}
            </div>
            {feedbackSubmitted && (
              <div className={styles.successMessage}>
                Thank you! Your feedback form has been prepared. Please submit it on GitHub.
              </div>
            )}
          </form>

          <div className={styles.alternativeFeedback}>
            <h3>Other Ways to Contribute</h3>
            <ul>
              <li>
                <strong>Community Forums:</strong> Join discussions at{' '}
                <Link to="https://github.com/simwilso/Gippsland-Open-Strategy/discussions">
                  GitHub Discussions
                </Link>
              </li>
              <li>
                <strong>Direct Edit:</strong> Submit a pull request with your suggested changes
              </li>
              <li>
                <strong>Email:</strong> Contact the project team directly
              </li>
            </ul>
          </div>
        </section>

        <nav className={styles.navFooter}>
          <Link to="/strategy" className="button button--outline button--secondary">
            ← Back to All Strategies
          </Link>
        </nav>
      </main>
    </Layout>
  );
}