import React from 'react';

import Layout from '../../components/layout';
import Hero from '../../components/hero';
import Text from '../../components/text';
import Content from '../../components/content';
import Client from '../../components/client';

import altschool from '../../img/clients/altschool-logo.svg';
import ingaged from '../../img/clients/ingaged-logo.svg';
import kasita from '../../img/clients/kasita-logo.svg';
import condeNast from '../../img/clients/conde-nast-logo.svg';
import dell from '../../img/clients/dell-logo.svg';
import honeywell from '../../img/clients/honeywell-logo.svg';
import rackspace from '../../img/clients/rackspace-logo.svg';

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
        <Text tag="h2">Here's some of our recent work.</Text>
        <Client company="AltSchool" link="/work/altschool" logo={altschool}>
          <Text tag="p">
            With deep thinking about AltSchool’s challenges, Frontside improved
            the testing infrastructure and reduced build times by 40%.
          </Text>
        </Client>

        <Client company="iNGAGED" link="/work/ingaged" logo={ingaged}>
          <Text tag="p">
            iNGAGED partnered with Frontside to deliver a prioritized MVP
            on-time and on-budget.
          </Text>
        </Client>

        <Client company="Kasita" link="/work/kasita" logo={kasita}>
          <Text tag="p">
            With over 30 connected smart devices in its beautifully designed
            tiny homes, Kasita needed a single mobile control application for
            Android and iOS that matched the aesthetic and promise of the brand.
          </Text>
        </Client>

        <Client company="Conde Nast" logo={condeNast}>
          <Text tag="p">
            Collaborated with its development team to create advanced UX
            interactions.
          </Text>
        </Client>

        <Client company="Dell" logo={dell}>
          <Text tag="p">
            Created a set of development tool prototypes for distribution with a
            new developer edition Linux laptop.
          </Text>
        </Client>

        <Client company="Honeywell" logo={honeywell}>
          <Text tag="p">
            Developed UI interactions for a facilities management application.
          </Text>
        </Client>

        <Client company="Rackspace" logo={rackspace}>
          <Text tag="p">
            Designed and built a suite of command line tools to interface
            directly with and lower the barrier to entry for open stack
            implementation.
          </Text>
        </Client>
      </Content>
    </Layout>
  );
}
