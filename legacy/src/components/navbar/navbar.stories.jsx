import React from 'react';
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Navbar } from './navbar';

export default {
  title: 'Layout/Navbar',
  component: Navbar,
};

const Template = (args) => <Navbar {...args} />;

export const NavMobile = Template.bind({});
NavMobile.parameters = {
  viewport: {
    defaultViewport: 'mobile',
  },
};

export const NavTablet = Template.bind({});
NavTablet.parameters = {
  viewport: {
    defaultViewport: 'tablet',
  },
};

export const NavDesktop = Template.bind({});
NavDesktop.parameters = {
  viewport: {
    defaultViewport: 'desktop',
  },
};

export const NavWidescreen = Template.bind({});
NavWidescreen.parameters = {
  viewport: {
    defaultViewport: 'widescreen',
  },
};
