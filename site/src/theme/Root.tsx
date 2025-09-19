import React from 'react';
import FeedbackWidget from '@site/src/components/FeedbackWidget';
import {useLocation} from '@docusaurus/router';

// This component wraps the entire Docusaurus app
export default function Root({children}) {
  const location = useLocation();
  
  // Only show feedback widget on /docs/* pages
  const isDocsPage = location.pathname.includes('/docs/');
  
  // Extract page title from the path
  const pageTitle = location.pathname.split('/').pop()?.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) || 'Documentation';
  
  return (
    <>
      {children}
      {isDocsPage && <FeedbackWidget pageTitle={pageTitle} />}
    </>
  );
}