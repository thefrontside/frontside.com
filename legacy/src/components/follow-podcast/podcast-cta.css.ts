import { style, styleVariants } from "@vanilla-extract/css";
import { baseButton } from "../../styles/buttons.css";
import vars from '../../styles/frontside-theme.css';

const newsletterForm = style([{
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: vars.space.lg,
  marginBottom: vars.space.xl,
  maxWidth: '37rem',
  paddingRight: vars.space.sm,
  paddingLeft: vars.space.sm,
}]);


export const ctaWrapper = style([newsletterForm, {
  textAlign: 'center',
}]);

export const copyButton = style([baseButton]);


const markBase = style({
  display: 'inline-block',
  opacity: '0',
  marginLeft: vars.space.xs,
});

export const copiedMark = styleVariants({
  default: [markBase],
  copied: [markBase, {
    opacity: '1',
  }]
});

export const rssOptions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
});

export const appleLink = style({
  display: 'inline-block',
});
