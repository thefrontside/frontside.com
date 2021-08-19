import { style } from '@vanilla-extract/css';
import vars, { laptopQuery, darkThemeQuery } from '../../styles/frontside-theme.css';

export const footerNav = style({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'left',
  '@media': {
    [laptopQuery]: {
      justifyContent: 'center',
    },
  }
});

export const footerNavLink = style({
  display: 'inline-block',
  boxSizing: 'border-box',
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeights.bold,
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
  marginBottom: vars.space.sm,
  textAlign: 'left',
  width: '50%',
  flexShrink: 1,
  color: vars.colors.blue,

  '@media': {
    [laptopQuery]: {
      width: 'inherit',
      textAlign: 'center',
    },
    [darkThemeQuery]: {
      color: vars.colors.white,
    }
  }
});
