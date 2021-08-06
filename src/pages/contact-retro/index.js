import React from 'react';
import { navigate } from 'gatsby-link';
import Layout from '../../components/layout';
import Content from '../../components/content';
import Text from '../../components/text';
import Button, { ButtonGroup } from '../../components/button';
import TextField from '../../components/text-field';
import Hero from '../../components/hero';

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  render() {
    return (
      <Layout title="Contact">
        <Hero
          heading={<Text>What challenges would you like help with today?</Text>}
          subheading={
            <Text widows={3}>
              Tell us what’s on your mind, and we’ll be in touch within 24
              hours.
            </Text>
          }
        />
        <Content>
          <section>
            <form
              name="contact"
              method="post"
              action="/contact/thanks/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={this.handleSubmit}
            >
              {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
              <input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <label>
                  Don’t fill this out:{' '}
                  <input name="bot-field" onChange={this.handleChange} />
                </label>
              </div>
              <TextField
                id="name"
                label="Your name"
                name="name"
                onChange={this.handleChange}
                required={true}
                type="text"
              />
              <TextField
                id="email"
                label="Email"
                name="email"
                onChange={this.handleChange}
                required={true}
                type="email"
              />
              <TextField
                id="message"
                label="Message"
                multiline
                name="message"
                onChange={this.handleChange}
                required={true}
                rows="10"
              />
              <ButtonGroup>
                <Button type="submit">Send</Button>
              </ButtonGroup>
            </form>
          </section>
        </Content>
      </Layout>
    );
  }
}
