import { createAtomicStyles, createAtomsFn } from '@vanilla-extract/sprinkles';
import vars from './frontside-theme.css';

// This block is only used for properties are react to
// the screen size responsively
const responsiveStyles = createAtomicStyles({
  conditions: {
    mobile: {},
    laptop: { '@media': vars.breakpoints.laptop },
    desktop: { '@media': vars.breakpoints.desktop },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', 'inline', 'inline-block'],
    position: ['relative'],
    flexDirection: ['row', 'column'],
    justifyContent: [
      'stretch',
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    listStyle: ['none'],
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    order: [0, 1, 2, 3],
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    placeItems: ['justifyContent', 'alignItems'],
  },
});

// This block is only for vars.colors that can adjust based
// on the current color mode.
const colorStyles = createAtomicStyles({
  conditions: {
    default: {},
    darkMode: { '@media': '(prefers-color-scheme: dark)' },
    hover: { selector: '&:hover' },
    focus: { selector: '&:focus' },
  },
  defaultCondition: 'default',
  properties: {
    color: vars.colors,
    background: vars.colors,
    fill: vars.colors,
    borderColor: vars.colors,
    borderStyle: ['solid'],
    borderRadius: vars.space,
    borderWidth: { none: '0px', small: '1px', medium: '2px', large: '4px' },
    backgroundImage: {
      'fs-gradient': `linear-gradient(to right, ${vars.colors['fs-blue']} 0%, ${vars.colors['fs-red']} 51%, ${vars.colors['fs-darkblue']} 100%)`,
    },
    backgroundSize: { default: '100% auto', lg: '200% auto' },
    backgroundPosition: ['left', 'right'],
    transition: { sm: '0.25s', md: '0.5s', lg: '1.0s' },
    boxShadow: {
      default: `0 0 20px ${vars.colors['fs-red']}`,
    },
    transform: { r45: 'rotate(45deg)', r315: 'rotate(315deg)' },
  },
});

const fontStyles = createAtomicStyles({
  conditions: {
    mobile: {},
    laptop: { '@media': vars.breakpoints.laptop },
    desktop: { '@media': vars.breakpoints.desktop },
  },
  defaultCondition: 'mobile',
  properties: {
    fontSize: vars.fontSize,
    lineHeight: vars.lineHeights,
    letterSpacing: vars.letterSpacing,
    fontWeight: vars.fontWeights,
    textAlign: ['center'],
    textDecoration: ['none'],
    textTransform: ['uppercase']
  },
  shorthands: {
    fontScale: ['fontSize', 'lineHeight', 'letterSpacing']
  }
});

export const atoms = createAtomsFn(responsiveStyles, colorStyles, fontStyles);

// It's a good idea to export the Atoms type too
export type Atoms = Parameters<typeof atoms>[0];
