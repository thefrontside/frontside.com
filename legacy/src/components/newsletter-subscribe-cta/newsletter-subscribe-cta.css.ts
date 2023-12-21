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
  marginLeft: vars.space['3xl'],
  marginRight: vars.space['3xl'],
});

export const signupButton = style([ actionButton, {
  width: '100%',
}]);
