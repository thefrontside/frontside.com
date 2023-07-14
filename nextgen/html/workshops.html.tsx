import type { Operation } from "effection";

export function* WorkshopsHtml(): Operation<JSX.Element> {
  return (
    <div class="prose m-auto">
      <section>
        <h1>Overview</h1>
        <p>
          Our Advanced Plugin Development workshop is more than just a training
          program - it's a transformative experience designed to provide you
          with the skills, knowledge, and confidence to fully harness the power
          of Backstage. Be it integrating new functionalities or optimizing
          existing processes, this workshop will prepare you to tackle
          real-world challenges with ease.
        </p>
      </section>
      <section>
        <h1>About</h1>
        <p>
          This workshop offers an in-depth exploration of Backstage plugin
          development. It is designed for experienced users seeking to expand
          their skills and fully leverage the powerful feature set of Backstage.
          By attending this workshop, you will not only build your confidence in
          developing a plugin but also gain insights into the unique
          architecture of Backstage.
        </p>
      </section>
      <section>
        <h1>Agenda</h1>
        <p>
          Our comprehensive curriculum includes the following key topics:
          <ul>
            <li>Frontend Plugin UI</li>
            <li>Backend Plugin Development</li>
            <li>Database Access, Migration, and Logging</li>
            <li>Testing on Frontend and Backend</li>
            <li>Code Sharing</li>
            <li>Integration with Other Backstage Services</li>
            <li>Plugin Packaging and Publishing</li>
            <li>Annotation of Entity Metadata in the Catalog</li>
            <li>Plugin Environment Optimization</li>
            <li>Dependency Injection in the Backend</li>
          </ul>
        </p>
      </section>
      <section>
        <h1>Instructors</h1>
        <p>
          Our team of experienced instructors have extensive knowledge and
          hands-on experience in plugin development for Backstage. Stay tuned
          for more details!
        </p>
      </section>
      <section>
        <h1>Registration/Booking</h1>
        <p>
          Registration details coming soon. Don't miss out on this unique
          opportunity to become a Backstage plugin development expert!
        </p>
      </section>
      <section>
        <h1>Testimonials/Reviews</h1>
        We value feedback from our participants. Check back soon to hear about
        their transformative experiences in our workshops.
      </section>
      <section>
        <h1>Prerequisites</h1>
        <p>
          Before attending the workshop, participants should:
          <ul>
            <li>Have a running and deployed Backstage instance.</li>
            <li>Be maintaining a Backstage instance.</li>
            <li>
              Have a basic understanding of React, Typescript, MonoRepos,
              Webpack, SQL, and Node.
            </li>
          </ul>
        </p>
      </section>
      <section>
        <h1>FAQs</h1>
        <p>
          Have questions? We'll have a detailed FAQ section soon to address all
          your queries.
        </p>
      </section>
      <section>
        <h1>Contact Us</h1>
        <p>
          Need more information? Feel free to reach out to us at [Your Contact
          Information]. We're here to help!
        </p>
      </section>
    </div>
  );
}
