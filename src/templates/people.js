import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const People = ({ name, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="name is-size-3 has-text-weight-bold is-bold-light">
                {name}
              </h2>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

People.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const PeoplePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <People
        contentComponent={HTMLContent}
        name={post.frontmatter.name}
        content={post.html}
      />
    </Layout>
  )
}

PeoplePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PeoplePage

export const peopleQuery = graphql`
  query PeopleQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        name
      }
    }
  }
`
