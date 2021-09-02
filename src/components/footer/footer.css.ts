import { style } from '@vanilla-extract/css';
import vars, { laptopQuery, darkThemeQuery, desktopQuery } from '../../styles/frontside-theme.css';
import { textSm, textXs } from '../../styles/typography.css';

export const footerWrapper = style({
  marginTop: vars.space.xl,
  marginBottom: vars.space.lg,

  '@media': {
    [laptopQuery]: {
      marginTop: vars.space['xl'],
    },
    [desktopQuery]: {
      marginTop: vars.space['2xl'],
    }
  }
})

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

export const footernavLink = style({
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

export const footerLegal = style([textSm, {
  textAlign: 'center',
  marginTop: vars.space['2xl'],
}]);

export const footerAddress = style({
  marginTop: vars.space.md,
  fontSize: vars.fontSize['xs'],
  lineHeight: vars.lineHeights['md'],
  letterSpacing: vars.letterSpacing['xs'],
});

export const footerCopyright = style([textXs, {
  textTransform: 'uppercase',
  marginTop: vars.space.md,
}]);
