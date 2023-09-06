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
  let headerImage = yield* url("../assets/pluginWorkshopHeaderImagev2.png");
  return (
    <article class="pt-14 text-blue-primary">
      <aside class="text-center">
        <p class="border-1 border-pink-primary text-blue-primary rounded-full inline-block text-center py-2 px-14 text-xs">
          Coming Soon!
        </p>
      </aside>
      <section class="grid lg:grid-cols-[2fr_1fr] mb-5 px-4 md:max-w-4xl xl:max-w-screen-2xl m-auto text-left">
        <div class="md:order-2 lg:order-1">
          <aside class="text-left uppercase text-neutral-500 mt-12 mb-5">
            <p><span class="font-black">Workshop & Training:</span> Advanced Backstage Plugin Development</p>
          </aside>
          <h1 class="text-blue-primary text-5xl md:text-6xl lg:text-6xl xl:text-8xl tracking-[-0.04em] font-black">
            <span class="text-blue-light">Discover</span> the{" "}
            <span class="text-pink-primary">Power</span>{" "}
      of Backstage{" "}<span class="text-blue-light">Plugins!</span>
          </h1>
          <p class="pr-8 mt-5 mb-10 tracking-wide text-xl text-blue-primary">
            Master the Art of Advanced Plugin Development <br /> with our Comprehensive
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
            class="inline-block text-center text-xl m-auto w-full md:w-auto rounded-md bg-blue-primary px-14 py-7 text-sm font-semibold text-white shadow-blue-box hover:ring hover:outline-indigo-600"
          >
            Signup for Waitlist
          </a>
          <script src="//embed.typeform.com/next/embed.js"></script>
        </div>
        <img class="w-3/5 md:w-2/5 lg:w-full m-auto mt-16 md:order-1" src={headerImage} alt="Image of Connected Nodes and Plugins" />
      </section>
      <section>
        <div class="max-w-fit mx-auto">
          <div class="grid md:grid-flow-col md:auto-cols-max sm:grid-col-1 gap-8 md:gap-4 px-8 md:px-0 mt-20 mb-20 place-items-center">
            <div class="basis-1/2 grow-0 shrink flex justify-center h-14 col-span-2 md:col-span-1 opacity-50">
                <img class="h-full w-auto" src={logoHP} />
            </div>
            <div class="basis-1/2 grow-0 shrink flex justify-center h-8 opacity-50">
              <img class="h-full md:w-auto" src={logoEricsson} />
            </div>
            <div class="basis-1/2 grow-0 shrink flex justify-center h-10 opacity-50">
                <img class="h-full md:w-auto" src={logoResideo} />
            </div>
            <div class="basis-1/2 grow-0 shrink flex justify-center h-6 opacity-50">
                <img class="h-full md:w-auto" src={logoIndeed} />
            </div>
            <div class="basis-1/2 grow-0 shrink flex justify-center h-6 opacity-50">
                <img class="h-full md:w-auto" src={logoHumanitec} />
            </div>
          </div>
        </div>
      </section>
      <section class="p-4 bg-gray-50 py-16">
        <header class="container mx-auto md:max-w-5xl">
          <H2 class="text-center">
            <span class="text-pink-primary">Everything</span>{" "}
            in Backstage is a Plugin!
          </H2>
          <p class=" text-lg text-center mx-auto text-inherit my-4 max-w-prose leading-relaxed">
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
        <p class="text-lg md:text-xl px-4  my-8 md:mx-auto max-w-prose leading-relaxed">
          <strong class="block md:text-2xl text-center">Pipeline Monitor Plugin</strong>

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
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M12.2452 1.81511C13.332 0.728297 15.0941 0.728297 16.1809 1.81511C17.2224 2.85663 17.2658 4.51831 16.3111 5.61151L16.1809 5.75078L6.57507 15.3566C6.36998 15.5616 6.12324 15.7192 5.85237 15.819L5.68709 15.8719L1.63212 16.9778C1.28553 17.0723 0.965457 16.7837 1.00301 16.4432L1.01818 16.3638L2.12408 12.3089C2.20039 12.029 2.33646 11.7698 2.52213 11.5488L2.63939 11.4209L12.2452 1.81511ZM11.385 4.09L3.3465 12.128C3.25421 12.2203 3.18118 12.3294 3.13111 12.4491L3.08884 12.572L2.21221 15.7827L5.42397 14.9071C5.50792 14.8842 5.58815 14.8506 5.66278 14.8073L5.77028 14.7352L5.86796 14.6495L13.906 6.611L11.385 4.09ZM15.4738 2.52222C14.8162 1.86461 13.7727 1.82808 13.0722 2.41262L12.9523 2.52222L12.092 3.383L14.613 5.904L15.4738 5.04368C16.1314 4.38608 16.1679 3.3426 15.5834 2.64212L15.4738 2.52222Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M11.9582 6.20041C12.0689 5.94742 11.9535 5.65261 11.7005 5.54193C11.4475 5.43124 11.1527 5.54661 11.042 5.79959L7.54205 13.7996C7.43136 14.0526 7.54673 14.3474 7.79972 14.4581C8.05271 14.5688 8.34752 14.4534 8.45821 14.2004L11.9582 6.20041ZM6.85355 7.64645C7.04882 7.84171 7.04882 8.15829 6.85355 8.35355L5.20711 10L6.85355 11.6464C7.04882 11.8417 7.04882 12.1583 6.85355 12.3536C6.65829 12.5488 6.34171 12.5488 6.14645 12.3536L4.14645 10.3536C3.95118 10.1583 3.95118 9.84171 4.14645 9.64645L6.14645 7.64645C6.34171 7.45118 6.65829 7.45118 6.85355 7.64645ZM13.1464 8.35355C12.9512 8.15829 12.9512 7.84171 13.1464 7.64645C13.3417 7.45118 13.6583 7.45118 13.8536 7.64645L15.8536 9.64645C16.0488 9.84171 16.0488 10.1583 15.8536 10.3536L13.8536 12.3536C13.6583 12.5488 13.3417 12.5488 13.1464 12.3536C12.9512 12.1583 12.9512 11.8417 13.1464 11.6464L14.7929 10L13.1464 8.35355ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 3.5C6 3.22386 6.22386 3 6.5 3H8.5C8.77614 3 9 3.22386 9 3.5V4H9.5C9.7761 4 10 4.22386 10 4.5V6.0304C10.0361 6.02578 10.0732 6.02505 10.1109 6.02861C11.7745 6.18567 13.3137 6.97735 14.409 8.2393C15.5042 9.50126 16.0714 11.1365 15.9928 12.8056C15.9142 14.4748 15.1958 16.0495 13.9868 17.2029C13.671 17.5042 13.328 17.7707 12.9639 18H15.5C15.7761 18 16 18.2239 16 18.5C16 18.7761 15.7761 19 15.5 19H2.5C2.22386 19 2 18.7761 2 18.5C2 18.2239 2.22386 18 2.5 18H9.4872C9.4915 17.9999 9.4957 17.9998 9.5 17.9998C10.9139 17.9998 12.2735 17.4553 13.2965 16.4794C14.3195 15.5034 14.9274 14.1709 14.9939 12.7586C15.0604 11.3463 14.5805 9.96258 13.6537 8.89477C12.727 7.82696 11.4246 7.15708 10.0169 7.02419C10.0113 7.02365 10.0056 7.02302 10 7.0223V12.5C10 12.7761 9.7761 13 9.5 13H9V13.5C9 14.3284 8.32843 15 7.5 15C6.67157 15 6 14.3284 6 13.5V13H5.5C5.22386 13 5 12.7761 5 12.5V4.5C5 4.22386 5.22386 4 5.5 4H6V3.5ZM7 13V13.5C7 13.7761 7.22386 14 7.5 14C7.77614 14 8 13.7761 8 13.5V13H7ZM6 12H9V5H6V12ZM4.5 16C4.22386 16 4 16.2239 4 16.5C4 16.7761 4.22386 17 4.5 17H10.5C10.7761 17 11 16.7761 11 16.5C11 16.2239 10.7761 16 10.5 16H4.5Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10.7548 6.4263C11.5352 5.64589 12.8005 5.64654 13.5808 6.42691C14.3612 7.20727 14.3619 8.47254 13.5814 9.25295C12.801 10.0334 11.5358 10.0327 10.7554 9.25235C9.97503 8.47198 9.97438 7.20672 10.7548 6.4263ZM12.8737 7.13401C12.4835 6.74379 11.8514 6.7439 11.4619 7.13341C11.0724 7.52292 11.0723 8.15502 11.4625 8.54524C11.8527 8.93547 12.4848 8.93536 12.8743 8.54585C13.2638 8.15634 13.264 7.52424 12.8737 7.13401Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              <path d="M11.7488 14.505C11.1919 14.769 10.506 14.6707 10.0453 14.2099L9.43602 13.6007L8.70399 14.8208C8.62478 14.9529 8.48915 15.041 8.33633 15.0599C8.18352 15.0787 8.03055 15.026 7.92168 14.9172L5.09099 12.0865C4.98209 11.9776 4.92945 11.8246 4.94831 11.6717C4.96716 11.5189 5.0554 11.3832 5.18751 11.304L6.40795 10.5726L5.79811 9.96276C5.33737 9.50202 5.23902 8.81611 5.50306 8.25924L4.38338 7.13957C4.18812 6.9443 4.18812 6.62772 4.38338 6.43246L5.44324 5.3726C6.36626 4.44958 7.7408 4.25328 8.85587 4.78368L9.79332 3.84623C11.4495 2.19003 13.8883 1.59039 16.1237 2.28975C16.8845 2.52777 17.4802 3.12355 17.7183 3.88432C18.4176 6.11969 17.818 8.55852 16.1618 10.2147L15.2244 11.1521C15.755 12.2672 15.5587 13.6419 14.6356 14.5649L13.5757 15.6248C13.3805 15.8201 13.0639 15.8201 12.8686 15.6248L11.7488 14.505ZM15.8251 3.24413C13.9449 2.65588 11.8935 3.16026 10.5004 4.55334L9.68493 5.36884L9.6887 5.3726L8.9816 6.07971L8.97782 6.07595L6.8559 8.19787L6.85967 8.20164L6.45718 8.60412C6.31155 8.79989 6.32756 9.07799 6.50522 9.25565L10.7524 13.5028C10.9304 13.6809 11.2093 13.6966 11.4052 13.5499L11.8066 13.1485L11.8102 13.1521L13.9321 11.0302L13.9285 11.0266L14.6356 10.3195L14.6392 10.3231L15.4547 9.50761C16.8478 8.11452 17.3521 6.06315 16.7639 4.18291C16.6238 3.73502 16.273 3.38426 15.8251 3.24413ZM12.5173 13.8592L13.2222 14.5641L13.9285 13.8578C14.4513 13.335 14.6245 12.5951 14.4481 11.9284L12.5173 13.8592ZM8.07956 5.56C7.41292 5.38376 6.67306 5.55699 6.15034 6.07971L5.44404 6.78601L6.14879 7.49076L8.07956 5.56ZM8.70714 12.8718L7.13691 11.3016L6.25115 11.8324L8.17594 13.7572L8.70714 12.8718Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              <path d="M5.80269 14.9121C5.99795 14.7169 5.99795 14.4003 5.80269 14.205C5.60743 14.0098 5.29085 14.0098 5.09559 14.205L3.32742 15.9732C3.13215 16.1685 3.13215 16.485 3.32742 16.6803C3.52268 16.8756 3.83926 16.8756 4.03452 16.6803L5.80269 14.9121Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              <path d="M4.3874 12.79C4.58266 12.9853 4.58266 13.3019 4.3874 13.4972L3.6785 14.206C3.48324 14.4013 3.16666 14.4013 2.9714 14.206C2.77614 14.0108 2.77614 13.6942 2.9714 13.4989L3.68029 12.79C3.87556 12.5948 4.19214 12.5948 4.3874 12.79Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              <path d="M7.21809 16.3276C7.41335 16.1324 7.41335 15.8158 7.21809 15.6205C7.02283 15.4253 6.70624 15.4253 6.51098 15.6205L5.80209 16.3294C5.60682 16.5247 5.60682 16.8413 5.80209 17.0365C5.99735 17.2318 6.31393 17.2318 6.50919 17.0365L7.21809 16.3276Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
            </svg>
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
        <div class="p-4 px-8 prose text-lg md:text-xl mx-auto text-inherit leading-tight">
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.1642 5.1017C10.1016 4.9661 9.90889 4.9661 9.84635 5.1017L9.12999 6.65476C9.1045 6.71002 9.05213 6.74807 8.99169 6.75524L7.29328 6.95661C7.14499 6.9742 7.08543 7.15749 7.19507 7.25888L8.45074 8.42009C8.49543 8.46141 8.51543 8.52298 8.50357 8.58268L8.17025 10.2602C8.14115 10.4067 8.29707 10.5199 8.42737 10.447L9.91978 9.61161C9.97289 9.58189 10.0376 9.58189 10.0907 9.61161L11.5831 10.447C11.7134 10.5199 11.8694 10.4067 11.8403 10.2602L11.5069 8.58268C11.4951 8.52298 11.5151 8.46141 11.5598 8.42009L12.8154 7.25888C12.9251 7.15749 12.8655 6.9742 12.7172 6.95661L11.0188 6.75524C10.9584 6.74807 10.906 6.71002 10.8805 6.65476L10.1642 5.1017Z" fill="#212121"/>
                <path d="M16 8C16 9.777 15.2275 11.3736 14 12.4722V17.5002C14 17.6784 13.9051 17.8432 13.751 17.9327C13.5968 18.0221 13.4067 18.0227 13.2519 17.9343L10 16.0761L6.74807 17.9343C6.59332 18.0227 6.40319 18.0221 6.24904 17.9327C6.09488 17.8432 6 17.6784 6 17.5002V12.4722C4.7725 11.3736 4 9.777 4 8C4 4.68629 6.68629 2 10 2C13.3137 2 16 4.68629 16 8ZM10 14C8.90714 14 7.88252 13.7078 7 13.1973V16.6386L9.75193 15.0661C9.90565 14.9782 10.0944 14.9782 10.2481 15.0661L13 16.6386V13.1973C12.1175 13.7078 11.0929 14 10 14ZM10 13C12.7614 13 15 10.7614 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9.72265 2.08397C9.8906 1.97201 10.1094 1.97201 10.2774 2.08397C12.2155 3.3761 14.3117 4.1823 16.5707 4.50503C16.817 4.54021 17 4.75117 17 5V9.5C17 13.3913 14.693 16.2307 10.1795 17.9667C10.064 18.0111 9.93605 18.0111 9.82051 17.9667C5.30699 16.2307 3 13.3913 3 9.5V5C3 4.75117 3.18296 4.54021 3.42929 4.50503C5.68833 4.1823 7.78446 3.3761 9.72265 2.08397ZM9.59914 3.34583C7.85275 4.39606 5.98541 5.09055 4 5.42787V9.5C4 12.892 5.96795 15.3634 10 16.9632C14.0321 15.3634 16 12.892 16 9.5V5.42787C14.0146 5.09055 12.1473 4.39606 10.4009 3.34583L10 3.09715L9.59914 3.34583Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M3 8.5C3 4.35786 6.35786 1 10.5 1C14.6421 1 18 4.35786 18 8.5C18 12.6421 14.6421 16 10.5 16C10.4668 16 10.4336 15.9998 10.4005 15.9994C10.5633 15.6808 10.6959 15.3442 10.7947 14.9934C14.2478 14.8394 17 11.9911 17 8.5C17 4.91015 14.0899 2 10.5 2C7.00897 2 4.16073 4.75214 4.00657 8.20514C3.6558 8.30386 3.31924 8.43651 3.00064 8.5993C3.00022 8.56625 3 8.53315 3 8.5ZM10.5 4C10.7761 4 11 4.22386 11 4.5V8H13.5C13.7761 8 14 8.22386 14 8.5C14 8.77614 13.7761 9 13.5 9H10.5C10.2239 9 10 8.77614 10 8.5V4.5C10 4.22386 10.2239 4 10.5 4ZM5 9.0275C2.75002 9.2762 1 11.1837 1 13.5C1 15.9853 3.01472 18 5.5 18C7.98528 18 10 15.9853 10 13.5C10 11.1837 8.24998 9.2762 6 9.0275V12.7929L6.64645 12.1464C6.84171 11.9512 7.15829 11.9512 7.35355 12.1464C7.54882 12.3417 7.54882 12.6583 7.35355 12.8536L5.85355 14.3536C5.65829 14.5488 5.34171 14.5488 5.14645 14.3536L3.64645 12.8536C3.45118 12.6583 3.45118 12.3417 3.64645 12.1464C3.84171 11.9512 4.15829 11.9512 4.35355 12.1464L5 12.7929V9.0275ZM3.5 15H7.5C7.77614 15 8 15.2239 8 15.5C8 15.7761 7.77614 16 7.5 16H3.5C3.22386 16 3 15.7761 3 15.5C3 15.2239 3.22386 15 3.5 15Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10.5 3L16.5428 3.00182L16.6281 3.01661L16.691 3.03779L16.767 3.07719L16.8221 3.11759L16.8824 3.17788L16.9112 3.21534L16.9533 3.2886L16.9834 3.37186L16.9979 3.45421L17 3.5V9.5C17 9.77614 16.7761 10 16.5 10C16.2545 10 16.0504 9.82312 16.0081 9.58988L16 9.5V4.706L4.706 16H9.5C9.74546 16 9.94961 16.1769 9.99194 16.4101L10 16.5C10 16.7455 9.82312 16.9496 9.58988 16.9919L9.5 17L3.47964 16.9996L3.4112 16.9921L3.30896 16.9622L3.23299 16.9228L3.17786 16.8824L3.11758 16.8221L3.08884 16.7847L3.04674 16.7114L3.01661 16.6281L3.01109 16.605C3.00383 16.5713 3 16.5361 3 16.5L3.00546 16.5739L3.00182 16.5428L3 10.5C3 10.2239 3.22386 10 3.5 10C3.74546 10 3.94961 10.1769 3.99194 10.4101L4 10.5V15.292L15.292 4H10.5C10.2545 4 10.0504 3.82312 10.0081 3.58988L10 3.5C10 3.22386 10.2239 3 10.5 3Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clip-path="url(#clip0_993_381)">
              <path d="M8.75 3.75C8.75 2.23122 7.51878 1 6 1C4.48122 1 3.25 2.23122 3.25 3.75C3.25 5.26878 4.48122 6.5 6 6.5C7.51878 6.5 8.75 5.26878 8.75 3.75ZM4.25 3.75C4.25 2.7835 5.0335 2 6 2C6.9665 2 7.75 2.7835 7.75 3.75C7.75 4.7165 6.9665 5.5 6 5.5C5.0335 5.5 4.25 4.7165 4.25 3.75Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              <path d="M2.5 7.5H6.68252C6.51859 7.81013 6.39687 8.14601 6.32501 8.5H2.5C2.22386 8.5 2 8.72386 2 9V9.5C2 10.7591 3.09851 12.1138 5.09636 12.4309C4.77396 12.6501 4.50546 12.9426 4.31486 13.2845C2.20563 12.7119 1 11.0874 1 9.5V9C1 8.17157 1.67157 7.5 2.5 7.5Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              <path d="M7.87858 7.5C8.38298 6.88925 9.14603 6.5 10 6.5C10.854 6.5 11.617 6.88925 12.1214 7.5C12.3605 7.78952 12.5415 8.12881 12.6465 8.5C12.7139 8.73842 12.75 8.98999 12.75 9.25C12.75 10.32 12.1389 11.2473 11.2466 11.7019C10.8919 11.8825 10.4929 11.9885 10.0702 11.9991C10.0469 11.9997 10.0235 12 10 12C9.97654 12 9.95315 11.9997 9.92983 11.9991C9.50709 11.9885 9.10806 11.8826 8.75342 11.7019C7.86115 11.2473 7.25 10.32 7.25 9.25C7.25 8.98999 7.28608 8.73842 7.35352 8.5C7.4585 8.12881 7.63948 7.78952 7.87858 7.5ZM8.41841 8.5C8.31042 8.72731 8.25 8.9816 8.25 9.25C8.25 9.96407 8.67768 10.5782 9.29086 10.8504C9.50763 10.9466 9.74757 11 10 11C10.2524 11 10.4924 10.9466 10.7091 10.8504C11.3223 10.5782 11.75 9.96407 11.75 9.25C11.75 8.9816 11.6896 8.72731 11.5816 8.5C11.3362 7.98351 10.8453 7.60627 10.2597 7.51914C10.175 7.50653 10.0883 7.5 10 7.5C9.91175 7.5 9.82502 7.50653 9.74028 7.51914C9.15468 7.60627 8.66377 7.98351 8.41841 8.5Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              <path d="M15.6851 13.2845C15.4945 12.9426 15.226 12.6501 14.9036 12.4309C16.9015 12.1138 18 10.7591 18 9.5V9C18 8.72386 17.7761 8.5 17.5 8.5H13.675C13.6031 8.14601 13.4814 7.81013 13.3175 7.5H17.5C18.3284 7.5 19 8.17157 19 9V9.5C19 11.0874 17.7944 12.7119 15.6851 13.2845Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              <path d="M14.4872 13.3706C14.2234 13.1398 13.878 13 13.5 13H6.5C6.06797 13 5.6786 13.1826 5.40489 13.4749C5.15376 13.7431 5 14.1036 5 14.5V15C5 16.9714 6.85951 19 10 19C13.1405 19 15 16.9714 15 15V14.5C15 14.0496 14.8015 13.6456 14.4872 13.3706ZM6 14.5C6 14.2239 6.22386 14 6.5 14H13.5C13.7761 14 14 14.2239 14 14.5V15C14 16.4376 12.5678 18 10 18C7.43216 18 6 16.4376 6 15V14.5Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              <path d="M14 1C15.5188 1 16.75 2.23122 16.75 3.75C16.75 5.26878 15.5188 6.5 14 6.5C12.4812 6.5 11.25 5.26878 11.25 3.75C11.25 2.23122 12.4812 1 14 1ZM14 2C13.0335 2 12.25 2.7835 12.25 3.75C12.25 4.7165 13.0335 5.5 14 5.5C14.9665 5.5 15.75 4.7165 15.75 3.75C15.75 2.7835 14.9665 2 14 2Z" fill="#14315D" stroke="#14315D" stroke-width="0.5"/>
              </g>
                <defs>
                  <clipPath id="clip0_993_381">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
            </svg>
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
      <section class="mt-16 bg-gray-50 py-16">
        <H2 class="text-center">Trusted By</H2>
        <div class="container mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 px-8 md:px-0 mt-12 place-items-center">
            <div class="basis-1/2 grow-0 shrink flex justify-center h-10">
              <img class="h-full md:w-auto" src={logoEricsson} />
            </div>
            <div class="basis-1/2 grow-0 shrink flex justify-center h-14">
                <img class="h-full md:w-auto" src={logoHP} />
            </div>
            <div class="basis-1/2 grow-0 shrink flex justify-center h-10 md:h-10">
                <img class="h-full md:w-auto" src={logoResideo} />
            </div>
            <div class="basis-1/2 grow-0 shrink flex justify-center h-8">
                <img class="h-full md:w-auto" src={logoIndeed} />
            </div>
            <div class="basis-1/2 grow-0 shrink flex justify-center h-6">
                <img class="h-full md:w-auto" src={logoHumanitec} />
            </div>
         </div>
        </div>
      </section>      <section class="mt-24 px-8 md:px-16">
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
    <h2 class={`${classes} font-black text-blue-primary text-3xl md:text-5xl leading-none tracking-tight`}>{children}</h2>
  );
}

