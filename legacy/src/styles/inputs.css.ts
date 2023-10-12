import { style } from '@vanilla-extract/css';
import vars, { darkThemeQuery, laptopQuery } from './frontside-theme.css';
import { textLg, textMd, textSmCaps } from './typography.css';

export const inputText = style({
  display: 'inline-block',
  padding: vars.space['2xs'],
  border: `2px solid ${vars.colors.blue}`,
  borderRadius: vars.radius.md,
  fontFamily: vars.fontFamily.main,
  fontSize: vars.fontSize.base,
  width: '100%',
  color: vars.colors.blue,
  '@media': {
    [darkThemeQuery]: {
      background: vars.colors.black,
      color: vars.colors.white,
      borderColor: vars.colors.white,
    }
  }
});
