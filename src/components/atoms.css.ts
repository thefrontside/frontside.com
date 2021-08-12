import { createAtomicStyles, createAtomsFn } from '@vanilla-extract/sprinkles';

const space = {
  auto: 'auto',
  none: 0,
  small: '4px',
  medium: '8px',
  large: '16px',
};

// This block is only used for properties are react to
// the screen size responsively
const responsiveStyles = createAtomicStyles({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', 'inline'],
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
    textAlign: ['center'],
    textDecoration: ['none'],
    listStyle: ['none'],
    paddingTop: space,
    paddingBottom: space,
    paddingLeft: space,
    paddingRight: space,
    marginTop: space,
    marginBottom: space,
    marginLeft: space,
    marginRight: space,
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

export const colors = {
  inherit: 'inherit',
  white: '#fff',
  'fs-red': '#f74d7b',
  'fs-blue': '#26abe8',
  'fs-darkblue': '#14315d',
};

const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
};

const lineHeights = {
  xs: '1rem',
  sm: '1.25rem',
  base: '1.5rem',
  lg: '1.75rem',
  xl: '1.75rem',
  '2xl': '2rem',
  '3xl': '2.25rem',
  '4xl': '2.5rem',
  '5xl': '1',
  '6xl': '1',
  '7xl': '1',
  '8xl': '1',
  '9xl': '1',
};

// This block is only for colors that can adjust based
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
    color: colors,
    background: colors,
    fill: colors,
    borderColor: colors,
    borderStyle: ['solid'],
    borderRadius: space,
    borderWidth: { none: '0px', small: '1px', medium: '2px', large: '4px' },
    fontFamily: { fs: 'proxima-nova' },
    fontSize: fontSizes,
    lineHeight: lineHeights,
    backgroundImage: {
      'fs-gradient': `linear-gradient(to right, ${colors['fs-blue']} 0%, ${colors['fs-red']} 51%, ${colors['fs-darkblue']} 100%)`,
    },
    backgroundSize: { default: '100% auto', large: '200% auto' },
    backgroundPosition: ['left', 'right'],
    transition: { small: '0.25s', medium: '0.5s', large: '1.0s' },
    boxShadow: {
      default: `0 0 20px ${colors['fs-red']}`,
    },
    transform: { r45: 'rotate(45deg)', r315: 'rotate(315deg)' },
  },
  shorthands: {
    textSize: ['fontSize', 'lineHeight'],
  },
});

export const atoms = createAtomsFn(responsiveStyles, colorStyles);

// It's a good idea to export the Atoms type too
export type Atoms = Parameters<typeof atoms>[0];
