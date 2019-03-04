import React from 'react'
import Layout from '../components/layout'
import Content from '../components/content';
import Text from '../components/text';

const NotFoundPage = () => (
  <Layout>
    <Content>
      <Text tag="h1">Not found</Text>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Content>
  </Layout>
)

export default NotFoundPage
