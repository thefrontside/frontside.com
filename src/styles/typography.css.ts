import { composeStyles, globalStyle, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import vars from './frontside-theme.css';

// const ClipBackgroundToText = style({
//   backgroundClip: 'text',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   fontWeight: vars.fontWeights.extrabold
// })

// export const TextGradientPinkSkyblue = composeStyles(ClipBackgroundToText, style({
//   background: `linear-gradient(90deg, ${vars.colors.pink}, ${vars.colors.skyblue} 95%)`,
// }));

// vanilla-extract composeStyles doesn't work, so we need to re-write
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
});

globalStyle(`${MardownColumn} h2`, {
  fontSize: '1.4545455rem',
  lineHeight: '2.8181818rem',
  marginTop: '1.4090909rem',
  marginBottom: '1.4090909rem',
});

globalStyle(`${MardownColumn} > h3`, {
  fontSize: '1rem',
  lineHeight: '2.8181818rem',
  marginTop: '1.4090909rem',
  marginBottom: '0',
  fontWeight: vars.fontWeights.extrabold
});

globalStyle(`${MardownColumn} code`, {
  fontSize: '0.8rem'
});

//composeStyles doesn't work so we need to repeat
globalStyle(`${MardownColumn} > p`, {
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







