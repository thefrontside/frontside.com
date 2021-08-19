import { composeStyles, style } from '@vanilla-extract/css';
import vars from './frontside-theme.css';

export const PaginationButton = style({
  background: vars.colors.blue,
  color: vars.colors.white,
  borderRadius: vars.radius.md,
  padding: vars.space['2xs'],
  paddingRight: vars.space['xs'],
  paddingLeft: vars.space['xs'],
  marginLeft: vars.space.md,
  marginRight: vars.space.md,
});
