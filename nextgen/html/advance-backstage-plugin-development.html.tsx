import type { Operation } from "effection";

export function* AdvancedBackstagePluginDevelopmentHtml(): Operation<
  JSX.Element
> {
  let logoHumanitec = yield* url("../assets/client-logos/logo-humanitec.svg");
  let logoHP = yield* url("../assets/client-logos/logo-HP-black.svg");
  let logoIndeed = yield* url("../assets/client-logos/logo-indeed.svg");
  let logoResideo = yield* url("../assets/client-logos/logo-resideo.svg");
  let logoEricsson = yield* url("../assets/client-logos/logo-ericsson.svg");
  return (
    <article class="pt-14">
      <aside class="text-center">
        <p class="border-1 border-pink-primary text-blue-primary rounded-full inline-block text-center py-1 px-6 text-xs">
          Coming Soon!
        </p>
      </aside>
      <section class="mt-8 p-5 md:max-w-4xl lg:max-w-5xl m-auto">
        <h1 class="text-blue-primary text-3xl md:text-6xl lg:text-7xl font-black">
          <span class="text-blue-light">Discover</span> the{" "}
          <span class="text-pink-primary">Power</span>{" "}
    of Backstage{" "}<span class="text-blue-light">Plugins!</span>
        </h1>
        <p class="mt-6 font-bold tracking-wide text-sm text-blue-primary">
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
          class="inline-block mt-8 text-center text-xs m-auto w-full md:w-auto rounded-md bg-blue-primary px-12 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Signup for Waitlist
        </a>
        <script src="//embed.typeform.com/next/embed.js"></script>
        <div class="flex justify-evenly align-center mt-16">
          <img class="" src={logoEricsson}/>
          <img src={logoHumanitec}/>
          <img src={logoHP}/>
          <img src={logoIndeed}/>
          <img src={logoResideo}/>
        </div>
      </section>
      <section class="bg-gray-50 py-8">
        <H2 class="text-center">
          <span class="text-pink-primary">Everything</span>{" "}
          in Backstage is a Plugin!
        </H2>
        <p class="text-xl px-4 my-8 md:mx-auto md:max-w-3xl">
          The architecture of Backstage is ingeniously designed around plugins.
          From the Service Catalog and Templates to the Scaffolder, Search and
          Tech Docs are all plugins! This workshop will only equip you with the
          skills to create and manage plugins - but start to build an
          understanding of a core component of grand architecture underpinning
          Backstage. Dive into our workshop, and empower yourself to shape and
          command Backstage Plugins!
        </p>
      </section>
      <section class="mt-8 text-center text-xl">
        <H2>
          Mastering Plugins: <br />{" "}
          Improve Your Internal Developer Portal Without Limitations
        </H2>
        <p class="px-4 my-8 md:mx-auto md:max-w-3xl">
          To fully harness and customize Backstage tailored to your company's
          unique needs, a deep understanding of plugin development is
          indispensable. Without mastering plugins, you're confined to a limited
          realm of possibilities in Backstage. Break through these constraints
          and unlock a world of expansive features. Embrace the power of plugins
          and propel your capabilities to new horizons. Say yes to boundless
          innovation!
        </p>
      </section>
      <section class="mt-12 md:grid md:grid-cols-2 gap-24 m-auto md:max-w-4xl">
        <hgroup class="px-4">
          <H3>
            Confidence to Innovate
          </H3>
          <p class="mt-8 py-4 text-xl">
            Grasping the intricacies of plugins doesn't just give you a
            technical advantage—it fuels your creativity. With this newfound
            knowledge, you'll confidently design and implement complex features
            and functionalities, turning your innovative ideas into tangible
            results.
          </p>
        </hgroup>
        <div class="mx-4 md:m-0 bg-gray-200 h-72" />
      </section>
      <section class="mt-12 m-auto md:grid md:grid-cols-2 gap-24 md:max-w-4xl items-center md:text-right">
        <hgroup class="px-4 order-1">
          <H3>Deepen your understanding of Backstage Architecture</H3>
          <p class="mt-8 py-4 text-xl">
            Beyond mere plugin creation, understanding plugins is synonymous
            with unraveling the core of Backstage's architecture. These are not
            just tools; they're the fundamental building blocks that shape
            Backstage. As you grow familiar with plugins, you'll naturally
            expand your comprehension of how the entire Backstage system is
            meticulously orchestrated.
          </p>
        </hgroup>
        <div class="mx-4 md:m-0 bg-gray-200 h-72" />
      </section>
      <section class="mt-12 md:grid md:grid-cols-2 gap-24 m-auto md:max-w-4xl">
        <hgroup class="px-4">
          <H3>
            Harness the Network Effect of Knowledge
          </H3>
          <p class="mt-8 py-4 text-xl">
            Learning in isolation has its limits. This workshop emphasizes
            collaborative learning, encouraging you to connect, discuss, and
            share insights with fellow developers. By networking your knowledge,
            you'll uncover fresh perspectives, tips, and tricks, enriching your
            learning experience and fostering a community of Backstage
            enthusiasts.
          </p>
        </hgroup>
        <div class="mx-4 md:m-0 bg-gray-200 h-72" />
      </section>
      <section class="mt-8 bg-gray-50 py-8">
        <H2 class="text-center">Who is this workshop for?</H2>

        <p class="px-4 my-8 md:mx-auto md:max-w-3xl">
          <strong>Experienced Backstage Developer:</strong>{" "}
          If you've already dabbled in Backstage and built a foundational
          understanding, but feel there's more to explore—especially in plugin
          development—this workshop is your next step. We're here to refine your
          skills and elevate your mastery.
        </p>
        <p class="px-4 my-8 md:mx-auto md:max-w-3xl">
          <strong>Developers Seeking Direction:</strong>{" "}
          Perhaps you haven't ventured into creating a Backstage plugin yet, If
          the term 'plugin' sounds daunting or if you’re unsure where to begin,
          fret not! We’ve tailored segments of our workshop especially for you.
          Think of this as a guided tour, ensuring you never feel lost, and
          always feel empowered to ask, learn, and grow.
        </p>
        <p class="px-4 my-8 md:mx-auto md:max-w-3xl">
          <strong>Teams with Aspirations:</strong>{" "}
          For teams eager to amplify their collective proficiency, this workshop
          is a goldmine. Equip your developer suite with the confidence and
          competence to craft sophisticated plugins, fostering a harmonized and
          empowered team environment.
        </p>
        <p class="px-4 my-8 md:mx-auto md:max-w-3xl">
          <strong>Everyone Eager to Learn:</strong>{" "}
          Whether you’re a seasoned developer, a newbie, or someone in between,
          if you have the zeal to learn, we have the insights to share. Join us,
          and let’s embark on this enlightening journey together.
        </p>
      </section>
      <section class="mt-8">
        <H2 class="text-center">What you will build</H2>
        <p class="px-4 my-8 md:mx-auto md:max-w-3xl">
          <strong class="block text-center">Pipeline Monitor Plugin</strong>

          In this workshop, we’ll build a Pipeline Monitor plugin to pull
          information from external services and aggregate that information in a
          database. The plugin will allow your users to customize it via YAML.
          The functionality of the YAML syntax will be configurable with custom
          functions in the backend. We’ll create a backend plugin engine that
          will use configuration from the YAML file to execute pipeline
          monitoring by polling each state of the pipeline, retrieving the
          status, and storing the status in the database. We’ll implement a
          mechanism for generating and storing information summaries in the
          database. The raw data about the pipeline and the status will be
          accessible via the backend REST API. We’ll write a front-end plugin
          that will show information from the database.
        </p>
      </section>
      <section class="mt-8 px-8 md:mt-16 md:grid md:grid-cols-2 gap-8 md:mx-auto md:max-w-5xl">
        <hgroup>
          <h3 class="font-bold text-lg text-blue-primary mb-4">Design</h3>
          <p class="before:content-['⃝'] before:block grid grid-cols-[4ch_auto]">
            Dive into custom frontend components tailored for Backstage's APIs.
            Learn the boundaries between React and Backstage APIs, ensuring
            components are efficient and interactive. Understand the vital link
            between frontend design and the plugin backend.
          </p>
        </hgroup>
        <hgroup>
          <h3 class="font-bold text-lg text-blue-primary mb-4">Build</h3>
          <p class="before:content-['⃝'] before:block grid grid-cols-[4ch_auto]">
            Navigate the creation of a robust backend. Design and deploy a
            specialized database for your plugin, ensuring optimal data flow
            between frontend and backend. Master the intricacies of seamless
            data storage and retrieval.
          </p>
        </hgroup>
        <hgroup>
          <h3 class="font-bold text-lg text-blue-primary mb-4">Test</h3>
          <p class="before:content-['⃝'] before:block grid grid-cols-[4ch_auto]">
            Embrace the importance of rigorous plugin testing. Uncover best
            practices to identify and rectify vulnerabilities, ensuring your
            plugin meets the highest quality benchmarks.
          </p>
        </hgroup>
        <hgroup>
          <h3 class="font-bold text-lg text-blue-primary mb-4">Ship</h3>
          <p class="before:content-['⃝'] before:block grid grid-cols-[4ch_auto]">
            Learn to bundle, build, and ship your plugin. Ensure your creation
            is packaged for easy integration, sharing your innovation internally
            or with the broader Backstage community.
          </p>
        </hgroup>
      </section>
      <section class="prose px-8 mt-16 mx-auto">
        <H2 class="text-center">What you will learn</H2>
        <hgroup>
          <h3>Frontend</h3>
          <li>Create frontend components that work as a page or a card.</li>
          <li>Create an API client for your backend API</li>
          <li>Make the API client available via an API Ref.</li>
          <li>Use your custom API ref in your components.</li>
          <li>Configure your API ref using Backstage API configuration.</li>
          <li>Customize the frontend components of a new custom kind.</li>
        </hgroup>
        <hgroup>
          <h3>Catalog</h3>
          <li>Define a new custom kind</li>
          <li>Create a new processor that will validate your kind using Zod</li>
          <li>Emit custom relationships using processors</li>
        </hgroup>
        <hgroup>
          <h3>Backend</h3>
          <li>
            Create a new backend plugin using a new backend extension system.
          </li>
          <li>Create a REST API backend using OpenAPI specification.</li>
          <li>
            Generate types from OpenAPI specification and store in package
            shared by frontend and backend
          </li>
          <li>Write database migrations to create a database.</li>
          <li>Write database migrations to change the database structure.</li>
          <li>Connect the database to the REST API</li>
          <li>Write a backend engine that will execute pipeline monitoring.</li>
        </hgroup>
      </section>
      <H2 class="text-center mt-16">Workshop Instructors</H2>
      <section class="mt-8 px-8 md:mt-16 md:grid md:grid-cols-2 gap-8 md:mx-auto md:max-w-5xl">
        <hgroup>
          <h3 class="font-bold text-lg text-blue-primary mb-4">
            Backstage Professional Services Partners
          </h3>
          <p class="before:content-['⃝'] before:block grid grid-cols-[4ch_auto]">
            Frontside is recognized as Professional Services Partners with
            Backstage and have helped companies of all sizes develop a wide
            range of solutions leveraging Plugins.
          </p>
        </hgroup>
        <hgroup>
          <h3 class="font-bold text-lg text-blue-primary mb-4">
            Enterprise Level Backstage Experience
          </h3>
          <p class="before:content-['⃝'] before:block grid grid-cols-[4ch_auto]">
            Frontside has worked with some of the largest Enterprise companies
            with extremely complex, data models, and requirements for their
            plugins and overall system of plugins. We build plugins that can can
            to Enterprise.
          </p>
        </hgroup>
        <hgroup>
          <h3 class="font-bold text-lg text-blue-primary mb-4">
            Early-Adopters, Highly Experienced Engineers
          </h3>
          <p class="before:content-['⃝'] before:block grid grid-cols-[4ch_auto]">
            Frontside has been using Backstage since before the. 1.0-release.
            Our engineers have a wealth of experience in Backstage and Backstage
            plugins, and their underlying technologies such as React and
            Typescript.
          </p>
        </hgroup>
        <hgroup>
          <h3 class="font-bold text-lg text-blue-primary mb-4">
            Pioneering the Backstage Ecosystem
          </h3>
          <p class="before:content-['⃝'] before:block grid grid-cols-[4ch_auto]">
            Frontside both independently and in collaboration with our trusted
            partners has been at the forefront of Backstage evolution - with
            plugins such as the Incremental Ingestion 2.0.
          </p>
        </hgroup>
        <hgroup>
          <h3 class="font-bold text-lg text-blue-primary mb-4">
            Core Contributors
          </h3>
          <p class="before:content-['⃝'] before:block grid grid-cols-[4ch_auto]">
            Frontside has been diligently studying the core mechanics, and where
            applicable have contribution code to both the core and by creating
            plugins to enhance core and overall functionality.
          </p>
        </hgroup>
        <hgroup>
          <h3 class="font-bold text-lg text-blue-primary mb-4">
            Engaged and Invested Community Members
          </h3>
          <p class="before:content-['⃝'] before:block grid grid-cols-[4ch_auto]">
            Proactive members of various Special Interest Groups, actively
            engage on the community Discord, and are regular attendees of
            Community and Contributor Backstage Sessions. Frontside’s commitment
            isn't just superficial; they are genuinely invested in uplifting and
            supporting fellow community members.
          </p>
        </hgroup>
      </section>
      <section class="mt-16 bg-gray-50 p-16">
        <H2 class="text-center">Trusted By</H2>
        <ul class="flex flex-wrap justify-between text-center mt-8">
          <li class="before:block before:content-['⚪️'] before:text-6xl">
            HP
          </li>
          <li class="before:block before:content-['⚪️'] before:text-6xl">
            Indeed
          </li>
          <li class="before:block before:content-['⚪️'] before:text-6xl">
            Humanitec
          </li>
          <li class="before:block before:content-['⚪️'] before:text-6xl">
            Ericsson
          </li>
          <li class="before:block before:content-['⚪️'] before:text-6xl">
            Resideo
          </li>
        </ul>
      </section>
      <section class="mt-16 px-8 md:px-16">
        <H2 class="text-center">What our clients say</H2>
        <blockquote class="mt-8 italic">
          "The Frontside developers have an incredibly high level of
          technical expertise. They've built complex plug-ins from
          scratch, massively improved our testing infrastructure, and
          contributed to critical-path product initiatives. While pair
          programming with Frontside developers they simultaneously
          show me how to use software they've built, and help me adopt
          new ways of thinking. Their code is well-tested and
          documented, which has raised the bar for our team around
          testing and documentation. I consider them educators as much
          as individual contributors, because they can communicate so
          clearly about their ideas, and they have deep skills to
          share."
        </blockquote>
        <cite class="block mt-4 before:content-['－'] before:mr-1">Benji Shine, Staff Software Engineer at AltSchool</cite>
      </section>
      <section class="py-64 px-8 text-center">
        <a
          data-tf-popup="fNHxMLVS"
          data-tf-opacity="100"
          data-tf-size="100"
          data-tf-iframe-props="title=Advanced Plugin Develop Sign up Form"
          data-tf-transitive-search-params
          data-tf-medium="snippet"
          id="signup-for-workshop"
          href="#"
          class="inline-block mt-8 text-center text-xs m-auto w-full md:w-auto rounded-md bg-blue-primary px-12 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Signup for Waitlist Today
        </a>
      </section>
    </article>
  );
}

function H2(
  { children, class: classes = " " }: {
    children: string | JSX.Element | (string | JSX.Element)[];
    class?: string;
  },
): JSX.Element {
  return (
    <h2 class={`${classes} font-black text-blue-primary text-2xl`}>{children}</h2>
  );
}
