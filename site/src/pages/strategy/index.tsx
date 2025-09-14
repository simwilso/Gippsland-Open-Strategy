import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function StrategyOverview(): JSX.Element {
  return (
    <Layout
      title="Strategy Documents"
      description="Community strategy documents for the Gippsland Open Roadmap initiative">
      <main className="container margin-vert--lg">
        <h1>Gippsland Open Strategy Documents</h1>
        <p className="lead">
          These strategy documents outline our community-driven approach to transforming Gippsland into a global leader in sustainable energy and innovation.
        </p>
        
        <div className="alert alert--info margin-vert--md" role="alert">
          <strong>We value your feedback!</strong> These documents are living resources that benefit from community input. 
          Please review and share your thoughts to help shape Gippsland's future.
        </div>

        <section className="margin-top--lg">
          <h2>Core Strategy Documents</h2>
          <div className={styles.cardGrid}>
            <div className={styles.strategyCard}>
              <h3>Master Strategy</h3>
              <p>Comprehensive overview of our strategic vision and implementation roadmap.</p>
              <Link className="button button--primary" to="/strategy/master-strategy">
                Read Master Strategy
              </Link>
            </div>
            
            <div className={styles.strategyCard}>
              <h3>Master Blueprint</h3>
              <p>Detailed technical and operational blueprint for the Gippsland Energy Hub.</p>
              <Link className="button button--primary" to="/strategy/master-blueprint">
                View Blueprint
              </Link>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <h2>Strategic Focus Areas</h2>
          <div className={styles.cardGrid}>
            <div className={styles.strategyCard}>
              <h3>Economic Development</h3>
              <p>Strategies for sustainable economic growth and job creation.</p>
              <Link className="button button--secondary" to="/strategy/economic-development">
                Explore →
              </Link>
            </div>
            
            <div className={styles.strategyCard}>
              <h3>Just Transition</h3>
              <p>Ensuring equitable transition for workers and communities.</p>
              <Link className="button button--secondary" to="/strategy/just-transition">
                Explore →
              </Link>
            </div>
            
            <div className={styles.strategyCard}>
              <h3>Innovation Hub</h3>
              <p>Building a world-class innovation ecosystem.</p>
              <Link className="button button--secondary" to="/strategy/innovation-hub">
                Explore →
              </Link>
            </div>
            
            <div className={styles.strategyCard}>
              <h3>Environmental Impact</h3>
              <p>Environmental sustainability and protection strategies.</p>
              <Link className="button button--secondary" to="/strategy/environmental-impact">
                Explore →
              </Link>
            </div>
            
            <div className={styles.strategyCard}>
              <h3>Stakeholder Engagement</h3>
              <p>Community and stakeholder partnership approaches.</p>
              <Link className="button button--secondary" to="/strategy/stakeholder-engagement">
                Explore →
              </Link>
            </div>
            
            <div className={styles.strategyCard}>
              <h3>Policy & Regulatory</h3>
              <p>Policy framework and regulatory considerations.</p>
              <Link className="button button--secondary" to="/strategy/policy-regulatory">
                Explore →
              </Link>
            </div>
          </div>
        </section>

        <section className="margin-top--lg">
          <h2>Implementation Plans</h2>
          <div className={styles.cardGrid}>
            <div className={styles.strategyCard}>
              <h3>90-Day Launch Plan</h3>
              <p>Immediate actions and quick wins for project momentum.</p>
              <Link className="button button--secondary" to="/strategy/90-day-launch">
                View Plan →
              </Link>
            </div>
            
            <div className={styles.strategyCard}>
              <h3>Brand & Narrative</h3>
              <p>Brand strategy and communication framework.</p>
              <Link className="button button--secondary" to="/strategy/brand-narrative">
                View Strategy →
              </Link>
            </div>
          </div>
        </section>

        <section className="margin-top--xl">
          <div className="card">
            <div className="card__body">
              <h3>How to Provide Feedback</h3>
              <p>Your input is crucial for refining these strategies. Here's how you can contribute:</p>
              <ul>
                <li><strong>Comment on specific sections:</strong> Each strategy page has a feedback form at the bottom</li>
                <li><strong>Join discussions:</strong> Participate in our community forums</li>
                <li><strong>Submit proposals:</strong> Use our GitHub issues for detailed suggestions</li>
                <li><strong>Attend meetings:</strong> Join our regular community consultation sessions</li>
              </ul>
              <div className="margin-top--md">
                <Link className="button button--primary" to="https://github.com/simwilso/Gippsland-Open-Strategy/issues">
                  Submit Feedback on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}