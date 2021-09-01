import vars, { laptopQuery, desktopQuery, darkThemeQuery, colorValues } from '../../styles/frontside-theme.css';
import { style,  } from '@vanilla-extract/css';

// // vanilla-extract composeStyles doesn't work, so we need to re-write
// export const NavWrap = composeStyles(pageWrap, style({
//   display: 'flex'
// }));

export const NavWrap = style({
  boxSizing: 'border-box',
  width: '100vw',
  overflow: 'hidden',
  padding: vars.space.md,
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'flex-end',

  '@media': {
    [laptopQuery]: {
      maxWidth: vars.pixelBase.maxWdith,
    },
    [desktopQuery]: {
      margin: '0 auto'
    },
  }
});

export const ContactButton = style({
  display: 'inline-block',
  background: `linear-gradient(45deg, ${vars.colors.pink} -20%, ${vars.colors.purple} 100%)`,
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSize.xs,
  color: vars.colors.white,
  textTransform: 'uppercase',
  paddingRight: vars.space['2xs'],
  paddingLeft: vars.space['2xs'],
  paddingTop: vars.space['3xs'],
  paddingBottom: vars.space['3xs'],
  borderRadius: vars.radius.md,
  letterSpacing: vars.letterSpacing.xl,
  marginLeft: vars.space.md,
});


export const NavLink = style({
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSize.xs,
  letterSpacing: vars.letterSpacing.xs,
  color: vars.colors.blue,
  marginLeft: vars.space.sm,
  marginRight: vars.space.sm,
  display: 'inline-block',
  position: 'relative',

  '@media': {
    [darkThemeQuery]: {
      color: vars.colors.white,
    }
  },
  'selectors': {
    '&[aria-current="page"]:before': {
      display: 'block',
      content: '" "',
      position: 'absolute',
      bottom: '-0.2rem',
      left: 0,
      width: '100%',
      height: '0.105rem',
      background: `linear-gradient(90deg, ${colorValues.pink}, ${colorValues.skyblue} 95%)`
    }
  }
});

export const LogoMargin = style({
  marginRight: 'auto',
});

export const LogoSVGFill = style({
  fill: vars.colors.blue,
  '@media': {
    [darkThemeQuery]: {
      fill: vars.colors.white,
    }
  }
});

// export const ContactButton = atoms({
//   color: 'white',
//   backgroundImage: 'fs-gradient',
//   backgroundPosition: {
//     default: 'left',
//     hover: 'right',
//   },
//   paddingX: 'lg',
//   paddingY: 'md',
//   borderWidth: 'none',
//   borderRadius: 'md',
//   borderStyle: 'solid',
//   borderColor: 'pink',
//   textAlign: 'center',
//   transition: 'sm',
//   backgroundSize: 'lg',
//   boxShadow: 'default',
// });

// export const MenuSVGFill = atoms({
//   fill: { default: 'blue', darkMode: 'white' },
// });



// export const NavHorizontalList = atoms({
//   display: 'flex',
//   flexDirection: 'row',
//   listStyle: 'none',
// });

// export const NavVerticalList = atoms({
//   display: 'flex',
//   flexDirection: 'column',
//   listStyle: 'none',
//   placeItems: 'flex-end',
// });
