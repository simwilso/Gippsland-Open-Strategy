import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../../components/StrategyPage.module.css';

export default function MasterBlueprint(): JSX.Element {
  return (
    <Layout
      title="Master Blueprint"
      description="Detailed technical and operational blueprint for the Gippsland Energy Hub">
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
                  <span className="breadcrumbs__link">Master Blueprint</span>
                </li>
              </ul>
            </nav>
            
            <div className="badge badge--secondary margin-bottom--md">Core Strategy</div>
            
            <article className={styles.strategyContent}>
              <h1>Master Blueprint</h1>
              
              <h2>Overview</h2>
              <p>
                The Master Blueprint for the Gippsland Energy Hub provides a comprehensive technical and operational 
                framework for transforming Gippsland into a global leader in sustainable energy.
              </p>

              <h2>Key Components</h2>

              <h3>1. Infrastructure Development</h3>
              <ul>
                <li>Grid modernization and integration</li>
                <li>Renewable energy generation facilities</li>
                <li>Energy storage solutions</li>
                <li>Hydrogen production and distribution</li>
              </ul>

              <h3>2. Economic Framework</h3>
              <ul>
                <li>Investment strategies</li>
                <li>Revenue models</li>
                <li>Risk management</li>
                <li>Community benefit sharing</li>
              </ul>

              <h3>3. Innovation Ecosystem</h3>
              <ul>
                <li>Research and development facilities</li>
                <li>Technology partnerships</li>
                <li>Skills development programs</li>
                <li>Startup incubation</li>
              </ul>

              <h3>4. Environmental Sustainability</h3>
              <ul>
                <li>Carbon reduction targets</li>
                <li>Environmental monitoring</li>
                <li>Biodiversity protection</li>
                <li>Circular economy principles</li>
              </ul>

              <h3>5. Community Integration</h3>
              <ul>
                <li>Stakeholder engagement</li>
                <li>Local employment strategies</li>
                <li>Community ownership models</li>
                <li>Social impact measurement</li>
              </ul>

              <h2>Implementation Roadmap</h2>
              <p>
                The blueprint will be implemented in phases over the next decade, with clear milestones 
                and success metrics for each stage.
              </p>

              <hr />
              
              <p className="text--italic">
                Note: This is a placeholder page. The detailed Master Blueprint document is currently 
                under development and will be published soon.
              </p>
            </article>
            
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
                    to="https://github.com/simwilso/Gippsland-Open-Strategy/issues/new?title=Feedback: Master Blueprint">
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