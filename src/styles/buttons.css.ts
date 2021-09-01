import { style } from '@vanilla-extract/css';
import vars, { darkThemeQuery } from './frontside-theme.css';

export const paginationButton = style({
  background: vars.colors.blue,
  color: vars.colors.white,
  borderRadius: vars.radius.md,
  padding: vars.space['2xs'],
  paddingRight: vars.space['xs'],
  paddingLeft: vars.space['xs'],
  marginLeft: vars.space.md,
  marginRight: vars.space.md,
});

export const tagButton = style({
  color: vars.colors.blue,
  padding: vars.space['3xs'],
  paddingRight: vars.space['2xs'],
  paddingLeft: vars.space['2xs'],
  textTransform: 'uppercase',
  border: `1px solid ${vars.colors.blue}`,
  borderRadius: vars.radius.lg,
  fontSize: vars.fontSize.xs,
  '@media': {
    [darkThemeQuery]: {
      color: vars.colors.white,
      borderColor: vars.colors.white,
    }
  }
});
