import vars, { laptopQuery, desktopQuery, darkThemeQuery, colorValues } from '../../styles/frontside-theme.css';
import { style } from '@vanilla-extract/css';

export const newsletterForm = style([{
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: vars.space.lg,
  marginBottom: vars.space.xl,
  maxWidth: '37rem',
}]);

export const inputButtonBar = style({
  background: `linear-gradient(135deg, ${vars.colors.pink}, ${vars.colors.skyblue} 95%)`,
  borderRadius: vars.radius.md,
  padding: vars.space['3xs'],
  display: 'flex',
});

export const inputElement = style({
  display: 'block',
  padding: vars.space['2xs'],
  border: 'none',
  borderRadius: vars.radius.md,
  fontFamily: vars.fontFamily.main,
  fontSize: vars.fontSize.base,
  width: '100%',
  color: vars.colors.blue,
  '@media': {
    [darkThemeQuery]: {
      background: vars.colors.black,
      color: vars.colors.white,
    }
  }
});

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
