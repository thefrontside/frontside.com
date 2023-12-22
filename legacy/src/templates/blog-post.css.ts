import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import vars from '../styles/frontside-theme.css';

export const postFooter = style({
  maxWidth: calc('37rem').add(vars.space.sm).add(vars.space.sm).toString(),
  marginLeft: vars.space.sm,
  marginRight: vars.space.sm,

  '@media': {
    'only screen and (min-width: 420px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: calc('37rem').add(vars.space['2xl']).add(vars.space['2xl']).toString(),
    },
    'only screen and (min-width: 768px)': {
      marginLeft: vars.space.xl,
      marginRight: vars.space.xl,
      maxWidth: calc('37rem').add(vars.space['2xl']).add(vars.space['2xl']).toString(),
    },
    'only screen and (min-width: 992px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: calc('37rem').add(vars.space['2xl']).add(vars.space['2xl']).toString(),
    },
  }
});
