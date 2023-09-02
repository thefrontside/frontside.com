import type { Operation } from "effection";
import { url } from "freejack/view.ts";

export function* AdvancedBackstagePluginDevelopmentHtml(): Operation<
  JSX.Element
> {
  let logoHumanitec = yield* url("../assets/client-logos/logo-humanitec.svg");
  let logoHP = yield* url("../assets/client-logos/logo-HP-black.svg");
  let logoIndeed = yield* url("../assets/client-logos/logo-indeed.svg");
  let logoResideo = yield* url("../assets/client-logos/logo-resideo.svg");
  let logoEricsson = yield* url("../assets/client-logos/logo-ericsson.svg");
  return (
    <article class="pt-14 text-blue-primary">
      <aside class="text-center">
        <p class="border-1 border-pink-primary text-blue-primary rounded-full inline-block text-center py-2 px-14 text-xs">
          Coming Soon!
        </p>
      </aside>
      <aside class="text-center uppercase text-neutral-400 mt-12 font-black ">
        <p>Workshop & Training: Advanced Backstage Plugin Development</p>
      </aside>
      <section class="mb-24 p-5 md:max-w-4xl lg:max-w-6xl m-auto text-center">
        <h1 class="text-blue-primary text-4xl sm:text-5xl lg:text-6xl xl:text-8xl tracking-[-0.04em] font-black">
          <span class="text-blue-light">Discover</span> the{" "}
          <span class="text-pink-primary">Power</span>{" "}
    of Backstage{" "}<span class="text-blue-light">Plugins!</span>
        </h1>
        <p class="mt-6 tracking-wide text-xl text-blue-primary">
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
          class="inline-block mt-16 text-center text-xl m-auto w-full md:w-auto rounded-md bg-blue-primary px-14 py-7 text-sm font-semibold text-white shadow-blue-box hover:ring hover:outline-indigo-600"
        >
          Signup for Waitlist
        </a>
        <script src="//embed.typeform.com/next/embed.js"></script>
        <div class="flex justify-evenly align-center mt-16">
          <img src={logoEricsson}/>
          <img src={logoHumanitec}/>
          <img src={logoHP}/>
          <img src={logoIndeed}/>
          <img src={logoResideo}/>
        </div>
      </section>
      <section class="bg-gray-50 py-16">
        <header class="container mx-auto md:max-w-5xl">
          <H2 class="text-center">
            <span class="text-pink-primary">Everything</span>{" "}
            in Backstage is a Plugin!
          </H2>
          <p class=" text-xl text-center mx-auto text-inherit my-4 max-w-prose leading-relaxed">
            The architecture of Backstage is ingeniously designed around plugins.
            From the Service Catalog and Templates to the Scaffolder, Search and
            Tech Docs are all plugins! This workshop will only equip you with the
            skills to create and manage plugins - but start to build an
            understanding of a core component of grand architecture underpinning
            Backstage. Dive into our workshop, and empower yourself to shape and
            command Backstage Plugins!
          </p>
        </header>
      </section>
      <section class="container mx-auto mt-24 px-4 md:max-w-5xl">
        <H2>
          Mastering Plugins: <br />{" "}
          Improve Your Internal Developer Portal Without Limitations
        </H2>
        <p class="my-8 text-xl text-inherit leading-relaxed max-w-prose">
          To fully harness and customize Backstage tailored to your company's
          unique needs, a deep understanding of plugin development is
          indispensable. Without mastering plugins, you're confined to a limited
          realm of possibilities in Backstage. Break through these constraints
          and unlock a world of expansive features. Embrace the power of plugins
          and propel your capabilities to new horizons. Say yes to boundless
          innovation!
        </p>
      </section>
      <section class="mt-24 md:grid md:grid-cols-2 gap-24 m-auto md:max-w-5xl">
        <div class="px-4">
          <h3 class="text-2xl text-blue-primary font-black">
            Confidence to Innovate
          </h3>
          <p class="py-4 text-l  text-inherit	leading-relaxed">
            Grasping the intricacies of plugins doesn't just give you a
            technical advantage—it fuels your creativity. With this newfound
            knowledge, you'll confidently design and implement complex features
            and functionalities, turning your innovative ideas into tangible
            results.
          </p>
        </div>
        <div class="mx-4 md:m-0 bg-gray-200 h-72" />
      </section>
      <section class="mt-12 m-auto md:grid md:grid-cols-2 gap-24 md:max-w-5xl items-center md:text-right">
        <div class="px-4 order-1">
          <h3 class="text-2xl text-blue-primary font-black">Deepen your understanding of Backstage Architecture</h3>
          <p class="py-4 text-1  text-inherit	leading-relaxed">
            Beyond mere plugin creation, understanding plugins is synonymous
            with unraveling the core of Backstage's architecture. These are not
            just tools; they're the fundamental building blocks that shape
            Backstage. As you grow familiar with plugins, you'll naturally
            expand your comprehension of how the entire Backstage system is
            meticulously orchestrated.
          </p>
        </div>
        <div class="mx-4 md:m-0 bg-gray-200 h-72" />
      </section>
      <section class="mt-12 md:grid md:grid-cols-2 gap-24 m-auto md:max-w-5xl">
        <div class="px-4">
          <h3 class="text-2xl text-blue-primary font-black">
            Harness the Network Effect of Knowledge
          </h3>
          <p class="py-4 text-l  text-inherit leading-relaxed">
            Learning in isolation has its limits. This workshop emphasizes
            collaborative learning, encouraging you to connect, discuss, and
            share insights with fellow developers. By networking your knowledge,
            you'll uncover fresh perspectives, tips, and tricks, enriching your
            learning experience and fostering a community of Backstage
            enthusiasts.
          </p>
        </div>
        <div class="mx-4 md:m-0 bg-gray-200 h-72" />
      </section>
      <section class="mt-24 bg-gray-50 py-24">
        <H2 class="text-center">Who is this workshop for?</H2>

        <p class="text-xl px-4 my-8 md:mx-auto md:max-w-3xl leading-relaxed">
          <strong>Experienced Backstage Developer:</strong>{" "}
          If you've already dabbled in Backstage and built a foundational
          understanding, but feel there's more to explore—especially in plugin
          development—this workshop is your next step. We're here to refine your
          skills and elevate your mastery.
        </p>
        <p class="text-xl px-4 my-8 md:mx-auto md:max-w-3xl leading-relaxed">
          <strong>Developers Seeking Direction:</strong>{" "}
          Perhaps you haven't ventured into creating a Backstage plugin yet, If
          the term 'plugin' sounds daunting or if you’re unsure where to begin,
          fret not! We’ve tailored segments of our workshop especially for you.
          Think of this as a guided tour, ensuring you never feel lost, and
          always feel empowered to ask, learn, and grow.
        </p>
        <p class="text-xl px-4 my-8 md:mx-auto md:max-w-3xl leading-relaxed">
          <strong>Teams with Aspirations:</strong>{" "}
          For teams eager to amplify their collective proficiency, this workshop
          is a goldmine. Equip your developer suite with the confidence and
          competence to craft sophisticated plugins, fostering a harmonized and
          empowered team environment.
        </p>
        <p class="text-xl px-4 my-8 md:mx-auto md:max-w-3xl leading-relaxed">
          <strong>Everyone Eager to Learn:</strong>{" "}
          Whether you’re a seasoned developer, a newbie, or someone in between,
          if you have the zeal to learn, we have the insights to share. Join us,
          and let’s embark on this enlightening journey together.
        </p>
      </section>
      <section class="mt-24">
        <H2 class="text-center">What you will build</H2>
        <p class="text-xl px-4  my-8 md:mx-auto max-w-prose leading-relaxed">
          <strong class="block text-2xl text-center">Pipeline Monitor Plugin</strong>

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
      <section class="mt-24 px-8 md:mt-16 md:grid md:grid-cols-2 gap-8 md:mx-auto md:max-w-5xl">
        <div class="flex">
          <div class="flex items-center bg-pink-100 rounded-full p-2 w-8 h-8">
            <svg class="stroke-primary blue" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
          </div>
          <div class="pt-1 pl-2">
            <h3 class="font-bold text-xl text-blue-primary mb-1">Design</h3>
            <p>
              Dive into custom frontend components tailored for Backstage's APIs.
              Learn the boundaries between React and Backstage APIs, ensuring
              components are efficient and interactive. Understand the vital link
              between frontend design and the plugin backend.
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center bg-pink-100 rounded-full p-2 w-8 h-8">
              <svg class="stroke-primary blue" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
          </div>
          <div class="pt-1 pl-2">
            <h3 class="font-bold text-xl text-blue-primary mb-1">Build</h3>
            <p>
              Navigate the creation of a robust backend. Design and deploy a
              specialized database for your plugin, ensuring optimal data flow
              between frontend and backend. Master the intricacies of seamless
              data storage and retrieval.
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center bg-pink-100 rounded-full p-2 w-8 h-8 shrink-0">
            <svg class="stroke-primary blue" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
          </div>
          <div class="pt-1 pl-2">
            <h3 class="font-bold text-xl text-blue-primary mb-2">Test</h3>
            <p>
              Embrace the importance of rigorous plugin testing. Uncover best
              practices to identify and rectify vulnerabilities, ensuring your
              plugin meets the highest quality benchmarks.
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center bg-pink-100 rounded-full p-2 w-8 h-8 shrink-0">
            <svg class="stroke-primary blue" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
          </div>
          <div class="pt-1 pl-2">
            <h3 class="font-bold text-xl text-blue-primary mb-1">Ship</h3>
            <p>
              Learn to bundle, build, and ship your plugin. Ensure your creation
              is packaged for easy integration, sharing your innovation internally
              or with the broader Backstage community.
            </p>
          </div>
        </div>
      </section>
      <section class="py-16 mt-24 bg-gray-50">
        <div class="prose text-xl mx-auto text-inherit leading-tight">
          <H2 class="text-center">What you will learn</H2>
          <div>
            <h3>Frontend</h3>
            <li>Create frontend components that work as a page or a card.</li>
            <li>Create an API client for your backend API</li>
            <li>Make the API client available via an API Ref.</li>
            <li>Use your custom API ref in your components.</li>
            <li>Configure your API ref using Backstage API configuration.</li>
            <li>Customize the frontend components of a new custom kind.</li>
          </div>
          <div>
            <h3>Catalog</h3>
            <li>Define a new custom kind</li>
            <li>Create a new processor that will validate your kind using Zod</li>
            <li>Emit custom relationships using processors</li>
          </div>
          <div>
            <h3>Backend</h3>
            <li>
              Create a new backend plugin using a new backend extension system.
            </li>
            <li>Create a REST API backend using OpenAPI specification.</li>
            <li>
              Generate types from OpenAPI specification.
            </li>
            <li>Store and Share types between frontend and backend.</li>
            <li>Write database migrations to create a database.</li>
            <li>Write database migrations to change the database structure.</li>
            <li>Connect the database to the REST API</li>
            <li>Write a backend engine that will execute pipeline monitoring.</li>
          </div>
        </div>
      </section>
      <H2 class="text-center mt-16">Workshop Instructors</H2>
      <section class="mt-24 px-8 md:mt-16 md:grid md:grid-cols-2 gap-x-24 gap-y-8 md:mx-auto md:max-w-5xl">
        <div class="flex">
            <div class="flex items-center bg-pink-100 rounded-full p-2 w-8 h-8 shrink-0">
              <svg class="stroke-primary blue" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
            </div>
          <div class="pt-1 pl-2">
            <h3 class="font-bold text-xl text-blue-primary mb-1">
              Backstage Professional Services Partners
            </h3>
            <p>
              Frontside is recognized as a Professional Services Partner with
              Backstage and have helped companies of all sizes develop a wide
              range of solutions leveraging Plugins.
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center bg-pink-100 rounded-full p-2 w-8 h-8 shrink-0">
            <svg class="stroke-primary blue" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
          </div>
          <div class="pt-1 pl-2">
            <h3 class="font-bold text-xl text-blue-primary mb-1">
              Enterprise Level Backstage Experience
            </h3>
            <p>
              Frontside has worked with some of the largest Enterprise companies
              with extremely complex, data models, and requirements for their
              plugins and overall system of plugins. We build plugins that can can
              to Enterprise.
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center bg-pink-100 rounded-full p-2 w-8 h-8 shrink-0">
            <svg class="stroke-primary blue" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
          </div>
          <div class="pt-1 pl-2">
            <h3 class="font-bold text-xl text-blue-primary mb-1">
              Early-Adopters, Highly Experienced Engineers
            </h3>
            <p>
              Frontside has been using Backstage before the 1.0-release.
              Our engineers have a wealth of experience in Backstage and Backstage
              plugins, and their underlying technologies such as React and
              Typescript.
            </p>
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center bg-pink-100 rounded-full p-2 w-8 h-8 shrink-0">
            <svg class="stroke-primary blue" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
          </div>
          <div class="pt-1 pl-2">
            <h3 class="font-bold text-xl text-blue-primary mb-1">
              Pioneering the Backstage Ecosystem
            </h3>
            <p>
              Frontside both independently and in collaboration with our trusted
              partners has been at the forefront of Backstage innovation.
            </p>
          </div>
        </div>
        <div>
          <div class="flex">
            <div class="flex items-center bg-pink-100 rounded-full p-2 w-8 h-8 shrink-0">
              <svg class="stroke-primary blue" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
            </div>
            <div class="pt-1 pl-2">
              <h3 class="font-bold text-xl text-blue-primary mb-1">
                Core Contributors
              </h3>
              <p>
                Frontside has been diligently studying the core mechanics, and where
                applicable have contribution code to both the core and by creating
                plugins to enhance core and overall functionality.
              </p>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="flex items-center bg-pink-100 rounded-full p-2 w-8 h-8 shrink-0">
            <svg class="stroke-primary blue" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
          </div>
          <div class="pt-1 pl-2">
            <h3 class="font-bold text-xl text-blue-primary mb-1">
              Engaged and Invested Community Members
            </h3>
            <p>
              Proactive members of various Special Interest Groups, actively
              engage on the community Discord, and are regular attendees of
              Community and Contributor Backstage Sessions. Frontside’s commitment
              isn't just superficial; they are genuinely invested in uplifting and
              supporting fellow community members.
            </p>
          </div>
        </div>
      </section>
      <section class="mt-16 bg-gray-50 p-16">
        <H2 class="text-center">Trusted By</H2>
        <div class="flex justify-evenly align-center mt-16">
          <img src={logoEricsson}/>
          <img src={logoHumanitec}/>
          <img src={logoHP}/>
          <img src={logoIndeed}/>
          <img src={logoResideo}/>
        </div>
      </section>
      <section class="mt-24 px-8 md:px-16">
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
          class="inline-block mt-16 text-center text-xl m-auto w-full md:w-auto rounded-md bg-blue-primary px-14 py-7 text-sm font-semibold text-white shadow-blue-box hover:ring hover:outline-indigo-600"
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
    <h2 class={`${classes} font-black text-blue-primary text-5xl leading-none tracking-tight`}>{children}</h2>
  );
}

