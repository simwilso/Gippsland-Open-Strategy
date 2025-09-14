import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './StrategyPage.module.css';

interface StrategyPageWrapperProps {
  title: string;
  description: string;
  category: string;
  docPath: string;
}

export default function StrategyPageWrapper({ 
  title, 
  description, 
  category, 
  docPath 
}: StrategyPageWrapperProps): JSX.Element {
  return (
    <Layout
      title={title}
      description={description}>
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <nav aria-label="breadcrumb" className="margin-bottom--md">
              <ul className="breadcrumbs">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to="/">
                    Home
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to="/strategy">
                    Strategy
                  </Link>
                </li>
                <li className="breadcrumbs__item breadcrumbs__item--active">
                  <span className="breadcrumbs__link">{title}</span>
                </li>
              </ul>
            </nav>
            
            <div className="badge badge--secondary margin-bottom--md">{category}</div>
            
            <div className={styles.strategyContent}>
              <h1>{title}</h1>
              <p className="lead">{description}</p>
              
              <div className="card margin-vert--lg">
                <div className="card__body">
                  <p>
                    This strategy document is available in our documentation library.
                  </p>
                  <Link 
                    className="button button--primary button--lg" 
                    to={docPath}>
                    View Full Document
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="margin-top--xl">
              <div className="card">
                <div className="card__body">
                  <h3>Provide Feedback</h3>
                  <p>
                    We value your input on this strategy document. Please share your thoughts and suggestions
                    to help us improve our approach.
                  </p>
                  <Link 
                    className="button button--primary" 
                    to={`https://github.com/simwilso/Gippsland-Open-Strategy/issues/new?title=Feedback: ${title}`}>
                    Submit Feedback on GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}