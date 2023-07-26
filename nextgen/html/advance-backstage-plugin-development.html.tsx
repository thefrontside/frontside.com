import type { Operation } from "effection";

export function* AdvancedBackstagePluginDevelopmentHtml(): Operation<
  JSX.Element
> {
  return (
    <article class="pt-14">
      <aside class="text-center">
        <p class="border-1 border-sky-500 text-pink-500 rounded-full inline-block text-center py-1 px-6 text-xs">
          Coming Soon!
        </p>
      </aside>
      <section class="mt-8 p-5 md:max-w-4xl lg:max-w-5xl m-auto">
        <h1 class="text-blue-900 text-3xl md:text-6xl lg:text-7xl font-black">
          <span class="text-sky-500">Discover</span> the{" "}
          <span class="text-pink-500">Power</span>{" "}
          of Backstage<span class="text-sky-500">Plugins!</span>
        </h1>
        <p class="mt-6 font-bold tracking-wide text-sm text-blue-900">
          Master the Art of Advanced Plugin Development with our Comprehensive
          Workshop
        </p>
        <a
          data-tf-popup="fNHxMLVS"
          data-tf-opacity="100"
          data-tf-size="100"
          data-tf-iframe-props="title=Advanced Plugin Develop Sign up Form"
          data-tf-transitive-search-params
          data-tf-medium="snippet"
          id="signup-for-workshop"
          href="#"
          class="inline-block mt-8 text-center text-xs m-auto w-full md:w-auto rounded-md bg-blue-900 px-12 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Signup for Waitlist
        </a>
        <script src="//embed.typeform.com/next/embed.js"></script>
        <p class="my-8 md:my-24 m-auto md:max-w-3xl">
          Join us to elevate your Backstage expertise and transform into a
          proficient plugin developer. Discover, learn, and kick-start your path
          to master the art of crafting sophisticated plugins for Backstage in
          this comprehensive, hands-on workshop.
        </p>
      </section>
      <section class="bg-gray-50 py-8">
        <H2 class="text-center">Everything in Backstage is a Plugin!</H2>
        <p class="px-4 my-8 md:mx-auto md:max-w-3xl">
          The architecture of Backstage is ingeniously designed around plugins.
          From the Service Catalog and Templates to the Scaffolder, Search and
          Tech Docs are all plugins! This workshop will only equip you with the
          skills to create and manage plugins - but start to build an
          understanding of a core component of grand architecture underpinning
          Backstage. Dive into our workshop, and empower yourself to shape and
          command Backstage Plugins!
        </p>
      </section>
      <section class="px-4 my-8 md:mb-16 md:mx-auto md:max-w-3xl">
        <H2 class="text-center">Topics covered include</H2>
        <ul class="pt-4 grid grid-cols-2 md:grid-cols-3 md:justify-items-center text-xs font-bold text-blue-900 gap-y-2">
          <li>Plugin Architecture</li>
          <li>Customizing Frontend UI</li>
          <li>Database Access</li>
          <li>Database Migration</li>
          <li>Logging</li>
          <li>Plugin Maintenance</li>
          <li>Packaging and Publishing Plugins</li>
          <li>Using Plugin Environment</li>
          <li>Dependency Injection</li>
          <li>Communication between Services</li>
          <li>Code Sharing</li>
          <li>Sharing Types</li>
          <li>Frontend Testing</li>
          <li>Backend Testing</li>
          <li>API Integration</li>
        </ul>
      </section>
      <section class="mt-12 md:grid md:grid-cols-2 m-auto md:max-w-4xl">
        <hgroup class="px-4">
          <H2>
            Deepen your understanding of Backstage Architecture
          </H2>
          <p class="mt-8 py-4 text-sm">
            Frontside is creating this Backstage SEAL Engagement to allow
            clients to able to gain the access they need to our experience and
            expertise around Backstage. Organizations have initiatives around
            Internal Developer Platforms and Developer Experience and need the
            injection of Experience to keep the momentum going in their
            initiatives and teams.
          </p>
        </hgroup>
        <div class="mx-4 md:m-0 bg-gray-200 h-72" />
      </section>
      <section class="mt-12 m-auto md:grid md:grid-cols-2 md:max-w-4xl items-center md:text-right">
        <hgroup class="px-4 order-1">
          <H2>Become a Proficient Plugin Developer</H2>
          <p class="mt-8 py-4 text-sm">
            Frontside is creating this Backstage SEAL Engagement to allow
            clients to able to gain the access they need to our experience and
            expertise around Backstage. Organizations have initiatives around
            Internal Developer Platforms and Developer Experience and need the
            injection of Experience to keep the momentum going in their
            initiatives and teams.
          </p>
        </hgroup>
        <div class="mx-4 md:m-0 bg-gray-200 h-72" />
      </section>
      <section class="mt-12 md:grid md:grid-cols-2 m-auto md:max-w-4xl">
        <hgroup class="px-4">
          <H2>
            Confidence to Innovate
          </H2>
          <p class="mt-8 py-4 text-sm">
            Frontside is creating this Backstage SEAL Engagement to allow
            clients to able to gain the access they need to our experience and
            expertise around Backstage. Organizations have initiatives around
            Internal Developer Platforms and Developer Experience and need the
            injection of Experience to keep the momentum going in their
            initiatives and teams.
          </p>
        </hgroup>
        <div class="mx-4 md:m-0 bg-gray-200 h-72" />
      </section>
    </article>
  );
}

function H2(
  { children, class: classes = " " }: { children: string; class?: string },
): JSX.Element {
  return (
    <h2 class={`${classes} font-bold text-blue-900 text-2xl`}>{children}</h2>
  );
}
