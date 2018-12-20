import React from "react";
import { navigate } from "gatsby-link";
import Layout from "../../components/Layout";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <Layout>
        <section>
          <div className="column">
            <div className="vcard">
              <div className="org">Frontside, Inc</div>
              <div>
                <a className="url fn n" href="https://frontside.io/">https://frontside.io</a>
              </div>
              <div>
                <a className="email" href="mailto:info@frontside.io">
                  info@frontside.io
                </a>                
              </div>
              <div className="adr">
                <div className="street-address">PO Box is #170249</div>
                <span className="locality">Austin</span>,
                <span className="region">Texas</span>,
                <span className="postal-code">78717</span>
                <span className="country-name">United States of America</span>
              </div>
              <div className="tel">+1 (800) 493-4589</div>
            </div>
          </div>
          <div className="column">
            <h1>What challenges would you like help with today?</h1>
            <p>
              Tell us what’s on your mind, and we’ll be in touch within 24
              hours.
            </p>
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
                  Don’t fill this out:{" "}
                  <input name="bot-field" onChange={this.handleChange} />
                </label>
              </div>
              <div className="field">
                <label className="label" htmlFor="name">
                  Your name
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    id="name"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    id="email"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="message">
                  Message
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    name="message"
                    onChange={this.handleChange}
                    id="message"
                    required={true}
                  />
                </div>
              </div>
              <div className="field">
                <button className="button is-link" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    );
  }
}
