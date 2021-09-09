import { style } from '@vanilla-extract/css';
import vars, { darkThemeQuery, laptopQuery } from './frontside-theme.css';
import { textLg, textMd, textSmCaps } from './typography.css';

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

export const bigTagButton = style([tagButton, {
  fontSize: vars.fontSize.lg,
}]);

export const socialLink = style([textSmCaps, {
  display: 'inline-block',
  background: vars.colors.blue,
  color: vars.colors.white,
  borderRadius: vars.radius.md,
  padding: vars.space['2xs'],
  paddingRight: vars.space['xs'],
  paddingLeft: vars.space['xs'],
  textTransform: 'uppercase',
  fontWeight: vars.fontWeights.bold,
  marginRight: vars.space.sm,
  marginTop: vars.space.md,
  marginBottom: vars.space.md,
}]);

const baseActionButton = style({
  display: 'inline-block',
  color: vars.colors.white,
  padding: vars.space['xs'],
  paddingRight: vars.space['sm'],
  paddingLeft: vars.space['sm'],
  borderRadius: vars.radius.md,
});

export const actionButton = style([baseActionButton, {
  backgroundImage: `linear-gradient(135deg, ${vars.colors.pink}, ${vars.colors.violet} 46%, ${vars.colors.violet} 54%, ${vars.colors.skyblue})`,
}]);

export const actionButtonGreen = style([baseActionButton, {
  backgroundImage: `linear-gradient(135deg, ${vars.colors.green}, ${vars.colors.violet} 46%, ${vars.colors.violet} 54%, ${vars.colors.skyblue})`,
}]);