import { style } from '@vanilla-extract/css';
import vars  from '../../styles/frontside-theme.css';
import {
  actionButton,
  actionButtonGreen,
  openmicButton,
} from '../../styles/buttons.css';

export const newsletterSubscribeCTA = style({
  marginTop: vars.space.md,
  marginBottom: vars.space.xl,
  '@media': {
    'only screen and (min-width: 420px)': {
      marginLeft: vars.space.xl,
      marginRight: vars.space.xl,
    },
    'only screen and (min-width: 992px)': {
      marginLeft: vars.space['2xl'],
      marginRight: vars.space['2xl'],
    },
    'only screen and (min-width: 1200px)': {
      marginLeft: vars.space['3xl'],
      marginRight: vars.space['3xl'],
    },
  },
});

export const signupButton = style([ actionButton, {
  width: '100%',
}]);
