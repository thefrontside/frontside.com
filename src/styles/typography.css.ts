import { globalStyle, style, composeStyles } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import vars, { darkThemeQuery, desktopQuery, laptopQuery } from './frontside-theme.css';

export const HeroHeading = style({
  fontSize: vars.fontSize['3xl'],
  lineHeight: vars.lineHeights['3xl'],
  letterSpacing: vars.letterSpacing['3xl'],
  fontWeight: vars.fontWeights.extrabold,
  textTransform: 'uppercase',
});

export const Heading2 = style({
  fontSize: vars.fontSize['xl'],
  lineHeight: vars.lineHeights['xl'],
  letterSpacing: vars.letterSpacing['xl'],
  fontWeight: vars.fontWeights.extrabold,
  textTransform: 'uppercase',
});

export const TextLg = style({
  fontSize: vars.fontSize['lg'],
  lineHeight: vars.lineHeights['lg'],
  letterSpacing: vars.letterSpacing['lg'],
});

export const TextPink = style({
  color: vars.colors.pink,
});

// const ClipBackgroundToText = style({
//   backgroundClip: 'text',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   fontWeight: vars.fontWeights.extrabold
// })

// export const TextGradientPinkSkyblue = composeStyles(ClipBackgroundToText, style({
//   background: `linear-gradient(90deg, ${vars.colors.pink}, ${vars.colors.skyblue} 95%)`,
// }));

// // vanilla-extract composeStyles doesn't work, so we need to re-write
export const TextGradientPinkSkyblue = style({
  background: `linear-gradient(90deg, ${vars.colors.pink}, ${vars.colors.skyblue} 95%)`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: vars.fontWeights.extrabold
});

// vanilla-extract composeStyles doesn't work, so we need to re-write
export const TextGradientSkybluePink = style({
  background: `linear-gradient(90deg, ${vars.colors.skyblue}, ${vars.colors.pink} 95%)`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: vars.fontWeights.extrabold
});


// vanilla-extract composeStyles doesn't work, so we need to re-write
export const TextGradientPinkPurple = style({
  background: `linear-gradient(90deg, ${vars.colors.pink} -20%, ${vars.colors.purple} 95%)`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: vars.fontWeights.extrabold
});

// vanilla-extract composeStyles doesn't work, so we need to re-write
export const TextGradientPurpleSkyblue = style({
  background: `linear-gradient(90deg, ${vars.colors.purple}, ${vars.colors.skyblue} 95%)`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: vars.fontWeights.extrabold
});

// vanilla-extract composeStyles doesn't work, so we need to re-write
export const TextGradientSkybluePurple = style({
  background: `linear-gradient(90deg, ${vars.colors.skyblue}, ${vars.colors.purple} 95%)`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: vars.fontWeights.extrabold
});

// vanilla-extract composeStyles doesn't work, so we need to re-write
export const TextGradientDemiSkybluePink = style({
  background: `linear-gradient(90deg, ${vars.colors.skyblue} -60%, ${vars.colors.pink} 180%)`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: vars.fontWeights.extrabold
});

// vanilla-extract composeStyles doesn't work, so we need to re-write
export const TextGradientPurplePink = style({
  background: `linear-gradient(90deg, ${vars.colors.purple}, ${vars.colors.pink} 95%)`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: vars.fontWeights.extrabold
});

// vanilla-extract composeStyles doesn't work, so we need to re-write
export const TextGradientGreenSkyblue = style({
  background: `linear-gradient(90deg, ${vars.colors.green}, ${vars.colors.skyblue} 95%)`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: vars.fontWeights.extrabold
});

// vanilla-extract composeStyles doesn't work, so we need to re-write
export const TextGradientSkyblueGreen = style({
  background: `linear-gradient(90deg, ${vars.colors.skyblue}, ${vars.colors.green} 95%)`,

  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: vars.fontWeights.extrabold
});


export const TextBottomGradient = style({
  position: 'relative',
  display: 'inline-block',
  selectors: {
    '&:before': {
      display: 'block',
      content: '" "',
      position: 'absolute',
      bottom: '0.210rem',
      left: 0,
      width: '100%',
      height: '0.200rem',
      background: `linear-gradient(90deg, ${vars.colors.pink}, ${vars.colors.skyblue} 95%)`
    }
  }
});

export const textBottomGreen = style({
  position: 'relative',
  display: 'inline-block',
  selectors: {
    '&:before': {
      display: 'block',
      content: '" "',
      position: 'absolute',
      bottom: '0.210rem',
      left: 0,
      width: '100%',
      height: '0.200rem',
      background: `linear-gradient(90deg, ${vars.colors.green}, ${vars.colors.skyblue} 95%)`
    }
  }
});

export const MardownColumn = style({
  boxSizing: 'border-box',
  width: '100vw',
  overflow: 'hidden',
  padding: vars.space.md,
  maxWidth: calc('37rem').add(vars.space.md).add(vars.space.md).toString(),
  marginLeft: 'auto',
  marginRight: 'auto',

  '@media': {
    [laptopQuery]: {
      paddingLeft: vars.space.xl,
      paddingRight: vars.space.xl,
      maxWidth: calc('37rem').add(vars.space.xl).add(vars.space.xl).toString(),
    },
    [desktopQuery]: {
      paddingLeft: vars.space['2xl'],
      paddingRight: vars.space['2xl'],
      maxWidth: calc('37rem').add(vars.space['2xl']).add(vars.space['2xl']).toString(),
    }
  }
});

globalStyle(`${MardownColumn} h2`, {
  fontSize: '1.4545455rem',
  lineHeight: '2.8181818rem',
  marginTop: '1.4090909rem',
  marginBottom: '1.4090909rem',
  letterSpacing: vars.letterSpacing.xl
});

globalStyle(`${MardownColumn} > h3`, {
  fontSize: '1rem',
  lineHeight: '2.8181818rem',
  marginTop: '1.4090909rem',
  marginBottom: '0',
  fontWeight: vars.fontWeights.bold,
  letterSpacing: vars.letterSpacing.xl,
  textTransform: 'uppercase'
});

globalStyle(`${MardownColumn} > h4`, {
  fontSize: '1rem',
  lineHeight: '2.8181818rem',
  marginTop: '1.4090909rem',
  marginBottom: '0',
  fontWeight: vars.fontWeights.bold,
  letterSpacing: vars.letterSpacing.xl,
});

globalStyle(`${MardownColumn} code`, {
  fontSize: '0.85rem'
});

globalStyle(`${MardownColumn} a`, {
  color: 'inherit'
});

globalStyle(`${MardownColumn} p a`, {
  borderBottomWidth: '0.065rem',
  borderBottomStyle: 'dotted',
  borderBottomColor: vars.colors.blue,
  '@media': {
    [darkThemeQuery]: {
      borderBottomColor: vars.colors.white,
    }
  }
});

globalStyle(`${MardownColumn} .markdown-heading-link`, {
  position: 'relative',
  display: 'block',
});

globalStyle(`${MardownColumn} .markdown-heading-link:before`, {
  content: '""',
  backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBkPSJNMTAuMDUgMTEuODljLS4xOS4yMy0uMDguMTItMi41NiAyLjU5YTQuMjIgNC4yMiAwIDAgMS02LTZMMy40MyA2LjZhLjM2LjM2IDAgMCAxIC42Mi4yNEE1LjU2IDUuNTYgMCAwIDAgNC4xOSA4YS4zNC4zNCAwIDAgMS0uMS4zM0wyLjcxIDkuNzFhMi41MyAyLjUzIDAgMCAwIDMuNTggMy41OEw4LjU2IDExYTIuNTMgMi41MyAwIDAgMCAwLTMuNThBMi43OSAyLjc5IDAgMCAwIDcuODcgN2EuMzYuMzYgMCAwIDEtLjE5LS4zNyAxLjU5IDEuNTkgMCAwIDEgLjQ0LS45MmwuMTMtLjEzYS4zNy4zNyAwIDAgMSAuNDItLjA3IDQuMjggNC4yOCAwIDAgMSAxLjA5Ljc4IDQuMjMgNC4yMyAwIDAgMSAuMjkgNS42em00LjQzLTQuNEwxMi41NyA5LjRhLjM2LjM2IDAgMCAxLS41Ny0uMjRBNS41NiA1LjU2IDAgMCAwIDExLjgxIDhhLjM0LjM0IDAgMCAxIC4xLS4zM2wxLjM4LTEuMzlhMi41MyAyLjUzIDAgMCAwLTMuNTgtMy41N0w3LjQ0IDVhMi41MyAyLjUzIDAgMCAwIDAgMy41OCAyLjc5IDIuNzkgMCAwIDAgLjY5LjQ5LjM2LjM2IDAgMCAxIC4xOS4zNyAxLjU5IDEuNTkgMCAwIDEtLjQ0LjkybC0uMTMuMTNhLjM3LjM3IDAgMCAxLS40Mi4wNyA0LjI4IDQuMjggMCAwIDEtMS4wOS0uNzhBNC4yMyA0LjIzIDAgMCAxIDYgNC4xMWMuMTQtLjIzIDAtLjExIDIuNTEtMi41OWE0LjIyIDQuMjIgMCAwIDEgNiA2eiIvPjwvc3ZnPg==)',
  backgroundSize: 'contain',
  height: '16px',
  opacity: 0.3,
  position: 'absolute',
  transform: 'translate(-1.3rem, 1rem)',
  width: '16px',
});

globalStyle(`${MardownColumn} .markdown-heading-link:hover:before`, {
  opacity: 0.6,
});

globalStyle(`${MardownColumn} img`, {
  width: calc('100%').add(vars.space.md).add(vars.space.md).toString(),
  maxWidth: calc('100%').add(vars.space.md).add(vars.space.md).toString(),
  marginLeft: calc(vars.space.md).negate().toString(),
  marginRight: calc(vars.space.md).negate().toString(),
  '@media': {
    [laptopQuery]: {
      width: calc('100%').add(vars.space.xl).add(vars.space.xl).toString(),
      maxWidth: calc('100%').add(vars.space.xl).add(vars.space.xl).toString(),
      marginLeft: calc(vars.space.xl).negate().toString(),
      marginRight: calc(vars.space.xl).negate().toString(),
    },
    [desktopQuery]: {
      width: calc('100%').add(vars.space['2xl']).add(vars.space['2xl']).toString(),
      maxWidth: calc('100%').add(vars.space['2xl']).add(vars.space['2xl']).toString(),
      marginLeft: calc(vars.space['2xl']).negate().toString(),
      marginRight: calc(vars.space['2xl']).negate().toString(),
    }
  }
});

globalStyle(`${MardownColumn} .blog-post--caption`, {
  fontStyle: 'italic',
  textAlign: 'center',
  paddingRight: vars.space.md,
  paddingLeft: vars.space.md,
})

globalStyle(`${MardownColumn} table`, {
  width: '100%'
});

globalStyle(`${MardownColumn} thead th`, {
  background: vars.colors.blue,
  color: vars.colors.white,
  textTransform: 'uppercase',
  textAlign: 'left',
  paddingLeft: vars.space['2xs'],
  paddingTop: vars.space['3xs'],
  paddingBottom: vars.space['3xs'],
  fontSize: vars.fontSize.sm,
  letterSpacing: vars.letterSpacing.sm,
});

globalStyle(`${MardownColumn} tbody td`, {
  paddingLeft: vars.space['2xs'],
  paddingTop: vars.space['3xs'],
  paddingBottom: vars.space['3xs'],
  borderBottomColor: vars.colors.gray,
  borderBottomStyle: 'solid',
  borderBottomWidth: '0.035rem',
});

globalStyle(`${MardownColumn} [class*="language-"]`, {
  '@media': {
    [darkThemeQuery]: {
      background: 'rgba(38, 171, 232, 0.1)',
      color: '#c2d0e6'
    }
  }
});

globalStyle(`${MardownColumn} [class*="language-"] [class*="language-"]`, {
  background: 'none',
});


//composeStyles doesn't work so we need to repeat
globalStyle(`${MardownColumn} p`, {
  lineHeight: '1.4090909rem',
  marginTop: '0',
  marginBottom: '1.4090909rem',
});

//composeStyles doesn't work so we need to repeat
globalStyle(`${MardownColumn} > ul`, {
  lineHeight: '1.4090909rem',
  marginTop: '0',
  marginBottom: '1.4090909rem',
});

//composeStyles doesn't work so we need to repeat
globalStyle(`${MardownColumn} > ol`, {
  lineHeight: '1.4090909rem',
  marginTop: '0',
  marginBottom: '1.4090909rem',
});

//composeStyles doesn't work so we need to repeat
globalStyle(`${MardownColumn} > table`, {
  lineHeight: '1.4090909rem',
  marginTop: '0',
  marginBottom: '1.4090909rem',
});

//composeStyles doesn't work so we need to repeat
globalStyle(`${MardownColumn} pre`, {
  lineHeight: '1.4090909rem',
  marginTop: '0',
  marginBottom: '1.4090909rem',
});

//composeStyles doesn't work so we need to repeat
globalStyle(`${MardownColumn} > blockquote`, {
  lineHeight: '1.4090909rem',
  marginTop: '0',
  marginBottom: '1.4090909rem',
});

export const BigQuote = style({
  fontSize: vars.fontSize['3xl'],
  lineHeight: vars.lineHeights['3xl'],
  letterSpacing: vars.letterSpacing['3xl'],
  fontWeight: vars.fontWeights.bold,
  margin: 0,
  textAlign: 'center',

  '@media': {
    [laptopQuery]: {
      marginRight: vars.space['2xl'],
      marginLeft: vars.space['2xl'],
    }
  }
});
