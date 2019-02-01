import React from "react";
import { Link } from "gatsby";

import Layout from "../../components/layout";
import Hero from "../../components/hero";
import Text from "../../components/text";
import Box from "../../components/box";
import Content from "../../components/content";

import altschool from "../../img/clients/altschool-logo.svg";
import ingaged from "../../img/clients/ingaged-logo.svg";
import kasita from "../../img/clients/kasita-logo.svg";
import condeNast from "../../img/clients/conde-nast-logo.svg";
import dell from "../../img/clients/dell-logo.svg";
import honeywell from "../../img/clients/honeywell-logo.svg";
import rackspace from "../../img/clients/rackspace-logo.svg";

export default function WorkIndex() {
  return (
    <Layout>
      <Hero
        heading={
          <Text>Bring us your most ambitious web application ideas.</Text>
        }
        subheading={
          <Text>
            For over a decade, we've been building robust, maintainable,
            performant applications with intuitive, modern user interfaces.
          </Text>
        }
      />

      <Content>
        <Text tag="h2">
          Here's some of our recent work.
        </Text>
        <Box>
          <img src={altschool} alt="altschool logo" />
          <Text tag="h3">AltSchool | Case Study</Text>
          <Text tag="p">
            With deep thinking about AltSchool’s challenges, Frontside improved
            the testing infrastructure and reduced build times by 40%.
          </Text>
          <Link to="/work/altschool">Read more...</Link>
        </Box>
        <Box>
          <img src={ingaged} alt="ingaged logo" />
          <Text tag="h3">iNGAGED | Case Study</Text>
          <Text tag="p">
            iNGAGED partnered with Frontside to deliver a prioritized MVP
            on-time and on-budget.
          </Text>
          <Link to="/work/ingaged">Read more...</Link>
        </Box>
        <Box>
          <img src={kasita} alt="kasita logo" />
          <Text tag="h3">Kasita | Case Study</Text>
          <Text tag="p">
            With over 30 connected smart devices in its beautifully designed
            tiny homes, Kasita needed a single mobile control application for
            Android and iOS that matched the aesthetic and promise of the brand.
          </Text>
          <Link to="/work/kasita">Read more...</Link>
        </Box>
      </Content>

      <Content>
        <Box>
          <img src={condeNast} alt="conde nast logo" />
          <Text tag="p">
            Collaborated with its development team to create advanced UX
            interactions.
          </Text>
        </Box>
        <Box>
          <img src={dell} alt="dell logo" />
          <Text tag="p">
            Created a set of development tool prototypes for distribution with a
            new developer edition Linux laptop.
          </Text>
        </Box>
        <Box>
          <img src={honeywell} alt="honeywell logo" />
          <Text tag="p">
            Developed UI interactions for a facilities management application.
          </Text>
        </Box>
        <Box>
          <img src={rackspace} alt="rackspace logo" />
          <Text tag="p">
            Designed and built a suite of command line tools to interface
            directly with and lower the barrier to entry for open stack
            implementation.
          </Text>
        </Box>
      </Content>
    </Layout>
  );
}
