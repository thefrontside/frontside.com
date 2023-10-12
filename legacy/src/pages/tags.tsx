import React from 'react';
import { kebabCase } from 'lodash';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import { pageWrap, sectionHeader, tagList, tagListItem } from '../styles/page.css';
import {
  headingXl,
  textGradientDemiSkybluePink,
  textGradientPinkPurple,
  textLg,
} from '../styles/typography.css';
import { bigTagButton } from '../styles/buttons.css';

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
  },
}) => (
  <Layout title="Tags">
    <header className={sectionHeader}>
      <h2 className={headingXl}>
        <span className={textGradientDemiSkybluePink}>Tags</span>
      </h2>
    </header>
    <section className={pageWrap}>
      <ul className={tagList}>
        {group.filter(({ totalCount }) => totalCount > 2).map((tag) => (
          <li key={tag.fieldValue} className={tagListItem}>
            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} className={bigTagButton}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export default TagsPage;

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
