import { style, styleVariants } from "@vanilla-extract/css";
import { baseButton, paginationButton } from "../../styles/buttons.css";
import { inputText } from "../../styles/inputs.css";
import vars, { darkThemeQuery } from '../../styles/frontside-theme.css';
import { newsletterForm } from "../subscribe-form/subscribe-forms.css";


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
