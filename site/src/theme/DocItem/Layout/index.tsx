import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import FeedbackWidget from '../../../components/FeedbackWidget';

export default function LayoutWrapper(props) {
  const { children, ...layoutProps } = props;
  
  // Extract the page title from the document
  const pageTitle = layoutProps.children?.type?.frontMatter?.title || 
                    layoutProps.children?.props?.children?.props?.children?.[0]?.props?.children ||
                    'Documentation Page';
  
  return (
    <>
      <Layout {...layoutProps}>{children}</Layout>
      <FeedbackWidget pageTitle={pageTitle} />
    </>
  );
}