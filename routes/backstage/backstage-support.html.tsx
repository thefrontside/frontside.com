import type { SitemapRoute } from "../../plugins/sitemap.ts";
import type { JSXElement } from "revolution/jsx-runtime";

import { useAppHtml } from "../app.html.tsx";

export function backstageSupportRoute(): SitemapRoute<JSXElement> {
  return {
    *routemap(generate) {
      return [{ pathname: generate() }];
    },
    handler: function* () {
      let backstageSupportHero =
        "../../assets/img/backstage-support/backstagesupport-header-40.png";
      let backstageValuePropI48 =
        "../../assets/img/backstage-support/backstagesupport-48.png";
      let backstageValuePropI49 =
        "../../assets/img/backstage-support/backstagesupport-49.png";
      let backstageValuePropI50 =
        "../../assets/img/backstage-support/backstagesupport-50.png";
      let backstageValuePropI51 =
        "../../assets/img/backstage-support/backstagesupport-51.png";
      let backstageValuePropI52 =
        "../../assets/img/backstage-support/backstagesupport-52.png";

      let leftLaurel = "../../assets/img/backstage-support/artboard-41.png";
      let rightLaurel = "../../assets/img/backstage-support/artboard-42.png";
      let backstageRibbon =
        "../../assets/img/backstage-support/artboard-43.png";
      let backstageContributorOfMonth =
        "../../assets/img/backstage-support/artboard-44.png";
      let backstageContributionCount =
        "../../assets/img/backstage-support/artboard-45.png";
      let backstageActiveSigParticipants =
        "../../assets/img/backstage-support/artboard-46.png";
      let backstageConPresentationCount =
        "../../assets/img/backstage-support/artboard-47.png";

      let supportTierSilver =
        "../../assets/img/backstage-support/tierSilver-artboard-53.png";
      let supportTierGold =
        "../../assets/img/backstage-support/tierGold-artboard-54.png";
      let supportTierPlatnium =
        "../../assets/img/backstage-support/tierPlatnium-artboard-55.png";

      let clientHpLogo = "../../assets/img/clients/HP_Black_RGB_150_SM.png";
      let clientIndeedLogo =
        "../../assets/img/clients/Indeed_2021_Logo_RGB_Blue.svg";
      let clientFannieMaeLogo = "../../assets/img/clients/Fannie-Mae-Logo.png";

      let AppHtml = yield* useAppHtml({
        title: "Backstage Support - Frontside",
        description:
          "We help you get the most out of Backstage for the long-run",
        ogImage: "/assets/img/q3-2021/meta-backstage.png",
        twitterXImage: "/assets/img/q3-2021/meta-backstage.png",
        author: "Frontside",
      });

      return (
        <AppHtml>
          <article>
            {/* Hero Section */}
            <header class="lg:gap-x-8 lg:grid lg:grid-cols-12 mx-auto mt-4 lg:px-8 p-8 lg:p-16 max-w-screen-2xl">
              <div class="lg:col-span-7 xl:col-span-6 lg:px-0 pt-10 lg:pt-2 pb-24 sm:pb-8">
                <div class="mx-auto lg:mx-0 max-w-2xl">
                  <h1 class="mt-12 sm:mt-10 font-black text-4xl text-blue-primary sm:text-6xl uppercase tracking-tight">
                    Enterprise Support for{" "}
                    <span class="bg-clip-text bg-gradient-to-r from-violet-500 to-green-500 text-transparent">
                      Backstage
                    </span>{" "}
                    by{" "}
                    <span class="bg-clip-text bg-gradient-to-r from-violet-500 to-green-500 text-transparent">
                      Frontside
                    </span>
                  </h1>
                  <p class="mt-6 text-gray-600 text-xl leading-8">
                    Accelerate your Backstage adoption with experience, insight
                    and practical advice from Backstage contributors.
                  </p>
                  <a
                    data-tf-popup="n5Hz8E9N"
                    data-tf-opacity="100"
                    data-tf-size="100"
                    data-tf-iframe-props="title=Get Support today"
                    data-tf-transitive-search-params
                    data-tf-medium="snippet"
                    data-tf-hidden="topic=backstage-support"
                    id="support-hero-top"
                    href="#"
                    class="inline-flex justify-center items-center bg-gradient-to-r from-[#099279] to-[#322678] shadow-blue-box m-auto mt-16 px-14 py-7 rounded-md hover:ring w-full md:w-auto font-semibold text-center text-sm text-white text-xl hover:outline-indigo-600"
                  >
                    <span class="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 13.49 14.14"
                        class="w-4 h-4"
                      >
                        <path
                          d="M12.78 6.36c-.59-.58-1.19-1.16-1.78-1.72S9.74 3.51 9.09 3A33 33 0 0 0 5 0a32.16 32.16 0 0 0 3 4.08c.51.66 1.08 1.26 1.64 1.92l.1.11c-1.54 0-3.39.1-4.74.21a33.28 33.28 0 0 0-5 .78 33.28 33.28 0 0 0 5 .78c1.34.12 3.19.12 4.74.18l-.11.11C9.08 8.8 8.51 9.4 8 10.05a32.93 32.93 0 0 0-3 4.09 32.21 32.21 0 0 0 4.09-3c.65-.53 1.25-1.1 1.88-1.65s1.22-1.15 1.81-1.73l.71-.71Z"
                          style="fill:#fff"
                        />
                      </svg>
                    </span>
                    Get Support today
                  </a>
                </div>
              </div>
              <div class="relative lg:col-span-6 mx-auto sm:w-3/4 md:w-3/4 lg:w-full h-64 md:h-3/4 lg:h-full">
                <img
                  src={backstageSupportHero}
                  alt="backstage support hero illustration"
                  class="w-full h-full object-contain"
                />
              </div>
            </header>

            {/* Badges Section */}
            <section class="mx-auto mt-20 px-4 py-15 md:py-20 lg:py-24 xl:py-30 max-w-screen-2xl">
              <header class="flex justify-center items-center gap-4 mb-8 text-center">
                <img
                  src={leftLaurel}
                  alt="left side of laurel surrounding the section header"
                  class="w-12 h-12"
                />
                <div>
                  <div class="font-bold text-2xl">We Are A Professional</div>
                  <div class="font-bold text-3xl">
                    <span class="bg-clip-text bg-gradient-to-r from-violet-500 to-green-500 text-transparent">
                      Backstage
                    </span>{" "}
                    Services Partner
                  </div>
                </div>
                <img
                  src={rightLaurel}
                  alt="right side of laurel surrounding the section header"
                  class="w-12 h-12"
                />
              </header>
              <div class="flex flex-wrap justify-center items-start gap-8 mt-12">
                <img
                  src={backstageRibbon}
                  alt="ribbon showing backstage achievements"
                  class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24"
                  style="position: relative; margin-bottom: 1rem;"
                />
                <div class="flex flex-col items-center gap-2 max-w-xs text-center">
                  <img
                    src={backstageContributorOfMonth}
                    alt="selected contributor of the month"
                    class="w-24 h-24"
                  />
                  <div class="text-sm">
                    Recognized as "Contributor of the Month"
                  </div>
                </div>
                <div class="flex flex-col items-center gap-2 max-w-xs text-center">
                  <img
                    src={backstageContributionCount}
                    alt="badge showing 34 pull requests"
                    class="w-24 h-24"
                  />
                  <div class="text-sm">
                    49 Pull Requests Merged Into Backstage Project
                  </div>
                </div>
                <div class="flex flex-col items-center gap-2 max-w-xs text-center">
                  <img
                    src={backstageActiveSigParticipants}
                    alt="many file folder active at once"
                    class="w-24 h-24"
                  />
                  <div class="text-sm">
                    Contributors to Catalog SIG and Adoption SIG
                  </div>
                </div>
                <div class="flex flex-col items-center gap-2 max-w-xs text-center">
                  <img
                    src={backstageConPresentationCount}
                    alt="presentation count"
                    class="w-24 h-24"
                  />
                  <div class="text-sm">2 Presentations at Backstage Conf</div>
                </div>
              </div>
            </section>

            {/* Value Prop Section */}
            <section class="mx-auto mt-20 px-10 max-w-screen-2xl">
              <header class="text-center mb-8">
                <h2 class="font-bold text-4xl text-blue-primary">
                  Expert Knowledge from{" "}
                  <strong class="bg-clip-text bg-gradient-to-r from-violet-500 to-green-500 text-transparent">
                    Leaders in Backstage
                  </strong>
                </h2>
              </header>
              <p class="mx-auto max-w-4xl text-center text-gray-600 text-xl leading-8">
                We are early adopters, core contributors, and leaders in the
                Backstage community. We have extensive experience with Backstage
                and have led Backstage, Developer Experience, and Internal
                Developer Platform (IDPs) projects that support over 100k
                developers. We have indispensable knowledge to help you, your
                team, and your organization reach your Backstage project goals.
              </p>
            </section>

            {/* Left Right Features Section */}
            <section class="bg-gray-50 mt-24 px-4 py-15 md:py-20 lg:py-24 xl:py-30">
              {/* Feature 1 */}
              <div class="items-center gap-24 grid grid-cols-1 md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
                <div class="px-4">
                  <h2 class="font-bold text-3xl text-blue-primary">
                    Give your DX Team{" "}
                    <span class="bg-clip-text bg-gradient-to-r from-violet-500 to-green-500 text-transparent">
                      A Boost
                    </span>
                  </h2>
                  <p class="py-4 text-gray-600 text-lg leading-8">
                    Backstage is a powerful tool because it comes complete with
                    architecture, many plugins, and best practices. With power
                    comes a learning curve that can be difficult to master
                    without help. Frontside gives your team the information they
                    need to be productive with Backstage.
                  </p>
                </div>
                <img src={backstageValuePropI48} alt="" class="w-full" />
              </div>

              {/* Feature 2 */}
              <div class="items-center gap-24 grid grid-cols-1 md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
                <div class="px-4">
                  <h2 class="font-bold text-3xl text-blue-primary">
                    Gain Traction with{" "}
                    <span class="bg-clip-text bg-gradient-to-r from-violet-500 to-green-500 text-transparent">
                      Proven Strategies
                    </span>
                  </h2>
                  <p class="py-4 text-gray-600 text-lg leading-8">
                    Companies are using Backstage to improve developer
                    experience, improve employee retention and build Internal
                    Developer Platforms. Frontside has seen firsthand how
                    successful Backstage adopters design their roadmaps.
                  </p>
                </div>
                <img
                  src={backstageValuePropI49}
                  alt=""
                  class="md:order-first w-full"
                />
              </div>

              {/* Feature 3 */}
              <div class="items-center gap-24 grid grid-cols-1 md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
                <div class="px-4">
                  <h2 class="font-bold text-3xl text-blue-primary">
                    Avoiding Forking With{" "}
                    <span class="bg-clip-text bg-gradient-to-r from-violet-500 to-green-500 text-transparent">
                      the Lastest Features
                    </span>
                  </h2>
                  <p class="py-4 text-gray-600 text-lg leading-8">
                    When Backstage doesn't do what your team needs, modifying
                    Backstage without applying changes upstream makes upgrading
                    difficult and locks you out of using the latest features of
                    Backstage. Frontside keeps your team unblocked by
                    contributing changes to the Backstage project so you can
                    always upgrade and quickly get the latest features.
                  </p>
                </div>
                <img src={backstageValuePropI50} alt="" class="w-full" />
              </div>

              {/* Feature 4 */}
              <div class="items-center gap-24 grid grid-cols-1 md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
                <div class="px-4">
                  <h2 class="font-bold text-3xl text-blue-primary">
                    Be Bold in Face of Ambitious{" "}
                    <span class="bg-clip-text bg-gradient-to-r from-violet-500 to-green-500 text-transparent">
                      DX&nbsp;initatives
                    </span>
                  </h2>
                  <p class="py-4 text-gray-600 text-lg leading-8">
                    Each organization is unique. Solutions to your ambitious
                    initiatives may not exist in the open-source Backstage
                    project. With Frontside by your side, you can take on any
                    initiative knowing that your team can reach your goals.
                    Frontside can help your team architect, build and optimize
                    your Backstage portal.
                  </p>
                </div>
                <img
                  src={backstageValuePropI51}
                  alt=""
                  class="md:order-first w-full"
                />
              </div>

              {/* Feature 5 */}
              <div class="items-center gap-24 grid grid-cols-1 md:grid-cols-2 m-auto mt-24 md:max-w-5xl">
                <div class="px-4">
                  <h2 class="font-bold text-3xl text-blue-primary">
                    Ship new DX features with{" "}
                    <span class="bg-clip-text bg-gradient-to-r from-violet-500 to-green-500 text-transparent">
                      confidence
                    </span>
                  </h2>
                  <p class="py-4 text-gray-600 text-lg leading-8">
                    As your Backstage project grows, so does the risk of
                    breaking existing features. Reliable testing practices can
                    catch problems before they impact your users' productivity.
                    Frontside helps DX teams implement Backstage ingestion and
                    integration testing practices that give you confidence
                    without blocking your team from shipping new Backstage
                    features.
                  </p>
                </div>
                <img src={backstageValuePropI52} alt="" class="w-full" />
              </div>
            </section>

            {/* Trust Section */}
            <section class="mx-auto mt-20 px-10 max-w-screen-2xl">
              <header class="text-center mb-8">
                <h2 class="font-bold text-3xl text-blue-primary">
                  Trusted by <strong class="text-green-600">Our Clients</strong>
                </h2>
              </header>
              <div class="flex justify-center items-center gap-12 flex-wrap">
                <div class="flex justify-center items-center">
                  <img src={clientHpLogo} alt="HP logo" width="55" />
                </div>
                <div class="flex justify-center items-center">
                  <img
                    src={clientFannieMaeLogo}
                    alt="Fannie Mae Logo"
                    width="200"
                  />
                </div>
                <div class="flex justify-center items-center">
                  <img src={clientIndeedLogo} alt="Indeed Logo" width="100" />
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section class="mx-auto mt-20 px-10 max-w-screen-2xl">
              <header class="text-center mb-8">
                <h2 class="font-bold text-4xl text-blue-primary">
                  The work we do{" "}
                  <strong class="bg-clip-text bg-gradient-to-r from-violet-500 to-green-500 text-transparent">
                    Transcends
                  </strong>
                </h2>
                <p class="mt-4 text-xl">Our clients speak.</p>
              </header>
              <div class="gap-8 grid grid-cols-1 md:grid-cols-3 mt-12">
                <div class="bg-white shadow-lg p-8 rounded-lg">
                  <div class="mb-4 font-serif text-6xl text-blue-primary">
                    &ldquo;
                  </div>
                  <div>
                    <p class="mb-4 text-gray-700 text-lg italic">
                      I learned more working with Frontside for six months than
                      I have in six years.
                    </p>
                    <p class="font-semibold text-blue-primary text-sm">
                      North, at Hewlett-Packard
                    </p>
                  </div>
                </div>
                <div class="bg-white shadow-lg p-8 rounded-lg">
                  <div class="mb-4 font-serif text-6xl text-blue-primary">
                    &ldquo;
                  </div>
                  <div>
                    <p class="mb-4 text-gray-700 text-lg italic">
                      Frontside has a dedication to engineering excellence.
                    </p>
                    <p class="font-semibold text-blue-primary text-sm">
                      Brian Beale, Engr Manager at Resideo
                    </p>
                  </div>
                </div>
                <div class="bg-white shadow-lg p-8 rounded-lg">
                  <div class="mb-4 font-serif text-6xl text-blue-primary">
                    &ldquo;
                  </div>
                  <div>
                    <p class="mb-4 text-gray-700 text-lg italic">
                      Hard to find a team more knowledgeable in Backstage than
                      Frontside.
                    </p>
                    <p class="font-semibold text-blue-primary text-sm">
                      Kaspar for Grünberg, CEO of Humanitec
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Plans Comparison Chart Section */}
            <section class="mx-auto mt-20 px-4 py-15 md:py-20 lg:py-24 xl:py-30 max-w-screen-2xl">
              <header class="text-center mb-12">
                <h2 class="font-bold text-4xl text-blue-primary">
                  Choose The Best Plan For Your Enterprise
                </h2>
              </header>
              <div class="overflow-x-auto">
                <table class="mx-auto border-collapse w-full max-w-5xl">
                  <thead>
                    <tr>
                      <th></th>
                      <th class="p-4">
                        <img
                          src={supportTierSilver}
                          alt=""
                          class="mx-auto w-20"
                        />
                      </th>
                      <th class="p-4">
                        <img
                          src={supportTierGold}
                          alt=""
                          class="mx-auto w-20"
                        />
                      </th>
                      <th class="p-4">
                        <img
                          src={supportTierPlatnium}
                          alt=""
                          class="mx-auto w-20"
                        />
                      </th>
                    </tr>
                    <tr class="border-b-2 border-gray-300">
                      <th class="p-4 font-bold text-left">+Benefits</th>
                      <th class="p-4 font-bold text-sm uppercase">
                        Silver
                        <br />
                        Plan
                      </th>
                      <th class="p-4 font-bold text-sm uppercase">
                        Gold
                        <br />
                        Plan
                      </th>
                      <th class="p-4 font-bold text-sm uppercase">
                        Platnium
                        <br />
                        Plan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-200">
                      <td class="p-4 text-left">Adoption Stage</td>
                      <td class="p-4 text-center">POC</td>
                      <td class="p-4 text-center">Early</td>
                      <td class="p-4 text-center">Advanced</td>
                    </tr>
                    <tr class="border-b border-gray-200">
                      <td class="p-4 text-left">
                        Recommended for <br />
                        teams with
                      </td>
                      <td class="p-4 text-center">less than 2 developers</td>
                      <td class="p-4 text-center">3 to 5 developers</td>
                      <td class="p-4 text-center">more than 5 developers</td>
                    </tr>
                    <tr class="border-b border-gray-200">
                      <td class="p-4 text-left">Standing Meetings</td>
                      <td class="p-4 text-center">not included</td>
                      <td class="p-4 text-center">1 per week</td>
                      <td class="p-4 text-center">2 per week</td>
                    </tr>
                    <tr class="border-b border-gray-200">
                      <td class="p-4 text-left">
                        Pair programming <br /> sessions
                      </td>
                      <td class="p-4 text-center">1 per week</td>
                      <td class="p-4 text-center">3 per week</td>
                      <td class="p-4 text-center">20 per month</td>
                    </tr>
                    <tr class="border-b border-gray-200">
                      <td class="p-4 text-left">Code Reviews</td>
                      <td class="p-4 text-center">not included</td>
                      <td class="p-4 text-center">1 per week</td>
                      <td class="p-4 text-center">12 per month</td>
                    </tr>
                    <tr class="border-b border-gray-200">
                      <td class="p-4 text-left">Code examples</td>
                      <td class="p-4 text-center">not included</td>
                      <td class="p-4 text-center">2 per month</td>
                      <td class="p-4 text-center">4 per month</td>
                    </tr>
                    <tr class="border-b border-gray-200">
                      <td class="p-4 text-left">Upstream changes</td>
                      <td class="p-4 text-center">not included</td>
                      <td class="p-4 text-center">1 concurrent</td>
                      <td class="p-4 text-center">2 concurrent</td>
                    </tr>
                    <tr>
                      <td class="p-4 text-left">Chat Support</td>
                      <td class="p-4 text-center">1 seat</td>
                      <td class="p-4 text-center">2 seats</td>
                      <td class="p-4 text-center">4 seats</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Final CTA Section */}
            <section class="flex justify-center px-4 py-15 md:py-20 lg:py-24 xl:py-30">
              <a
                data-tf-popup="n5Hz8E9N"
                data-tf-opacity="100"
                data-tf-size="100"
                data-tf-iframe-props="title=Get Support Today"
                data-tf-transitive-search-params
                data-tf-medium="snippet"
                data-tf-hidden="topic=backstage-support"
                id="support-page-bottom"
                href="#"
                class="inline-flex justify-center items-center bg-gradient-to-r from-[#099279] to-[#322678] shadow-blue-box m-auto mt-20 mb-20 px-14 py-7 rounded-md hover:ring w-full md:w-auto font-semibold text-sm text-white text-xl hover:outline-indigo-600"
              >
                <span class="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 13.49 14.14"
                    class="w-4 h-4"
                  >
                    <path
                      d="M12.78 6.36c-.59-.58-1.19-1.16-1.78-1.72S9.74 3.51 9.09 3A33 33 0 0 0 5 0a32.16 32.16 0 0 0 3 4.08c.51.66 1.08 1.26 1.64 1.92l.1.11c-1.54 0-3.39.1-4.74.21a33.28 33.28 0 0 0-5 .78 33.28 33.28 0 0 0 5 .78c1.34.12 3.19.12 4.74.18l-.11.11C9.08 8.8 8.51 9.4 8 10.05a32.93 32.93 0 0 0-3 4.09 32.21 32.21 0 0 0 4.09-3c.65-.53 1.25-1.1 1.88-1.65s1.22-1.15 1.81-1.73l.71-.71Z"
                      style="fill:#fff"
                    />
                  </svg>
                </span>
                Get Support Today
              </a>
            </section>

            <script defer src="//embed.typeform.com/next/embed.js"></script>
          </article>
        </AppHtml>
      );
    },
  };
}
