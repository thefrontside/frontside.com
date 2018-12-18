import React from "react";
import { Link } from "gatsby";

export default function Services() {
  return (
    <>
      <section>
        <h1>
          We bring deep expertise in web UI platforms to help your application
          projects run smoothly
        </h1>
      </section>
      <section>
        <p>
          When you have multiple teams building on the same platform, poor
          framework decisions can slow down your entire organization.
        </p>
        <p>
          But with the right toolkit, your product will be able to withstand
          change, and your team will move faster than ever before with a
          cohesive frontend stack.
        </p>
      </section>
      <section>
        <h2>Build a better platform for your applications</h2>
        <p>Here’s how we can help your organization</p>
        <div className="column">[image]</div>
        <div className="column">
          <h3>Frontend web application consulting</h3>
          <p>
            Too often, teams with limited frontend experience make costly
            mistakes. Documentation for your open source tools can only go so
            far. At some point, you need support from someone’s who dealt with
            these tools firsthand.
          </p>
          <p>
            Let us bridge the knowledge gap. We’ve built the huge applications,
            and we know how these open source projects operate at scale. We’ll
            give you full visibility on what to look out for in every step of
            your project to ensure implementation goes smoothly.
          </p>
        </div>
        <div className="column">
          <h3>The Platform Profile</h3>
          <p>
            Planning out your platform, but not sure which options to go with?
            Let’s talk. We’ll do an in-depth assessment of the frameworks you’re
            considering to give you an advance alert on potential problems or
            bugs you can expect with your current architecture.
          </p>
          <p>
            At the end, you’ll get a comprehensive report on 12 key
            considerations along with practical steps to improve your platform’s
            architecture.
          </p>
        </div>
        <div className="column">[image]</div>
        <div className="column">[image]</div>
        <div className="column">
          <h3>Software team coaching</h3>
          <p>
            By the end of our engagement, your team will be well equipped to
            continue building upon your platform for years to come. This is
            because we are ruthlessly committed to collaborative
            consulting—training up engineers through pair programming and
            communicating the details behind every decision.
          </p>
          <p>
            For us, knowledge transfer isn’t the last stage of a project. It’s
            built in every step of the way.
          </p>
        </div>
      </section>
      <section>
        <div className="column">[portrait]</div>
        <div className="column">
          <p>
            “We had engineers with no previous web development or frontend
            experience, and, at the end of our engagement, those engineers were
            fully capable of taking over from where Frontside left us and moving
            the product forward.”
          </p>
          Ilya Busigin | iNGAGED
        </div>
        <div className="column">[portrait]</div>
        <div className="column">
          <p>
            “They introduced us to a new way of thinking about and working with
            our forms, which is a core part of our application. We’ve adopted
            that philosophy across the board. They suggested using an immutable
            state in Ember, which turned out well. The quality of their work was
            far higher than what we’ve seen before. They intensely tested their
            work, and their tech support was fantastic.”
          </p>
          Benjamin Shine | AltSchool
        </div>
        <div className="column">[portrait]</div>
        <div className="column">
          <p>
            “Everything was well documented, well tested and followed the
            well-known conventions for working with JavaScript. It was evident
            they were interested in giving us a software base that we could
            evolve on our own.”
          </p>
          Jason Jaynes | Kasita
        </div>
      </section>
      <section>
        <h2>We make your projects predictable with tried-and-true processes</h2>
        <p>These methods are the foundation of our clients’ success:</p>
        <div className="column">
          <h3>Framework agnostic approach</h3>
          <p>
            Every framework has its best use cases and its limitations. With
            deep experience in frameworks such as Ember, Angular, React, and
            Vue, we can help you identify the right solution for your
            organization’s specific goals.
          </p>
        </div>
        <div className="column">
          <h3>Automated testing</h3>
          <p>
            Every project begins with a comprehensive test plan so we can
            automate the testing process. This greatly reduces the load on QA
            and eliminates feedback cycles between them and your development
            team. It’s common for our clients to see a 4x increase in the number
            of releases that they can do in a month.
          </p>
        </div>
        <div className="column">
          <h3>Automated deployment</h3>
          <p>
            Because everything is run through test suites and bugs are caught
            before they exist, you’ll be able to write, integrate, and deploy
            software continuously. That means no more resource-intensive release
            events. We’ll help you implement this system across your department
            so you can release safely and efficiently throughout all future
            projects.
          </p>
        </div>
        <div className="column">
          <h3>Zero regressions—really.</h3>
          <p>
            Sure, it sounds radical. But we’ve been able to do it again and
            again. Our process helps you deploy products that are bug-free,
            guaranteed.
          </p>
        </div>
      </section>
      <section>
        <h2>Get ready to lead the best projects of your life</h2>
        <p>Reach out today to learn how we can help your organization move faster, without compromising quality</p>
        <Link to="/contact">Get in touch</Link>
      </section>
    </>
  );
}
