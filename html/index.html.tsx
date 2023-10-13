import type { Operation } from "effection";

export default function* IndexHTML(): Operation<JSX.Element> {
  return (
    <article class="prose m-auto">
      <section>
        <h1>Developer Index</h1>
        <p>
          This is just a place holder for the `/` path. However, You won't see
          this page anywhere except development because this root url is
          currently inhabited by the Gatsby-based website.
        </p>
        <p>
          Have a look at these sub-sites which are visible:
          <nav>
            <ul>
              <li>
                <a href="./workshops/advanced-backstage-plugin-development">
                  Advanced Backstage Plugin Development
                </a>
              </li>
            </ul>
          </nav>
        </p>
      </section>
    </article>
  );
}
