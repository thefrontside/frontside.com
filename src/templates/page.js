import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Content, { HTMLContent } from '../components/content';
import Text from '../components/text';

const Page = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <Content>
        <Text tag="h1">{post.frontmatter.title}</Text>
        <HTMLContent content={post.html} />
      </Content>
    </Layout>
  );
};

Page.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Page;

export const PageQuery = graphql`
  query Page($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
