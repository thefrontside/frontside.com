import vars, { darkThemeQuery } from '../../styles/frontside-theme.css';
import { style } from '@vanilla-extract/css';
import { inputText } from '../../styles/inputs.css';

export const newsletterForm = style([{
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: vars.space.lg,
  marginBottom: vars.space.xl,
  maxWidth: '37rem',
  paddingRight: vars.space.sm,
  paddingLeft: vars.space.sm,
}]);

export const inputButtonBar = style({
  background: `linear-gradient(135deg, ${vars.colors.pink}, ${vars.colors.skyblue} 95%)`,
  borderRadius: vars.radius.md,
  padding: vars.space['3xs'],
  display: 'flex',
});

export const inputElement = style([inputText, {
  border: 'none',
}]);

export const textButton = style({
  background: 'none',
  border: 'none',
  fontFamily: vars.fontFamily.main,
  fontSize: vars.fontSize.base,
  color: vars.colors.white,
  fontWeight: vars.fontWeights.bold,
  cursor: 'pointer',
  flexShrink: 0,
  paddingLeft: vars.space['xs'],
});
