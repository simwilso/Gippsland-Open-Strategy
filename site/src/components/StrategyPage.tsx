import React from 'react';
import Layout from '@theme/Layout';
import ReactMarkdown from 'react-markdown';
import styles from './StrategyPage.module.css';

interface StrategyPageProps {
  title: string;
  description: string;
  category: string;
  content: string;
}

export default function StrategyPage({ title, description, category, content }: StrategyPageProps): JSX.Element {
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
                  <a className="breadcrumbs__link" href="/">
                    Home
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="/strategy">
                    Strategy
                  </a>
                </li>
                <li className="breadcrumbs__item breadcrumbs__item--active">
                  <span className="breadcrumbs__link">{title}</span>
                </li>
              </ul>
            </nav>
            
            <div className="badge badge--secondary margin-bottom--md">{category}</div>
            
            <article className={styles.strategyContent}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
            
            <div className="margin-top--xl">
              <div className="card">
                <div className="card__body">
                  <h3>Provide Feedback</h3>
                  <p>
                    We value your input on this strategy document. Please share your thoughts and suggestions
                    to help us improve our approach.
                  </p>
                  <a 
                    className="button button--primary" 
                    href={`https://github.com/simwilso/Gippsland-Open-Strategy/issues/new?title=Feedback: ${title}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    Submit Feedback on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}