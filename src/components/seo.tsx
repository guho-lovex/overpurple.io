/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 * https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet-async/?=react-helmet-async
 *
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet-async';

function SEO({ description, title, url }: any) {
  const { site } = useStaticQuery(query);
  const { siteMetadata } = site;

  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    url: url || siteMetadata.siteUrl,
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta property="og:title" content={seo.title} />
      <meta
        property="og:image"
        content={
          'https://guho-lovex.github.io/overpurple.io/static/a286eda4fae9271e7db3e399b52d5ad0/e5610/xiaolan.png'
        }
      />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta
        name="google-site-verification"
        content="498PPMVxFUtdOPe084Vsdx3Q9URFjp8RxJmKsjkFbys"
      />
    </Helmet>
  );
}

export default SEO;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`;
