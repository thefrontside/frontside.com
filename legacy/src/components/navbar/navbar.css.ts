import vars, { laptopQuery, desktopQuery, darkThemeQuery, lightThemeQuery, colorValues } from '../../styles/frontside-theme.css';
import { style, globalStyle, styleVariants } from '@vanilla-extract/css';
import { pageWrap } from '../../styles/page.css';
import gradientDecor from '../../img/q3-2021/button-gradient.png';
import { boldCaps, fillBlueDashWhite, headingMd, headingSm, textBlue, textBlueDashWhite, textSm, textXs } from '../../styles/typography.css';

export const navWrap = style([pageWrap, {
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'flex-end',
  position: 'relative',
  zIndex: 10000,
}]);

export const contactButton = style({
  display: 'inline-block',
  background: `url(${gradientDecor}) no-repeat right bottom, linear-gradient(90deg, ${vars.colors.violet}, ${vars.colors.pink} 120%)`,
  backgroundSize: 'contain, cover',
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
  order: 3,
});

export const navLink = style({
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSize.xs,
  letterSpacing: vars.letterSpacing.xs,
  color: vars.colors.blue,
  display: 'inline-block',
  position: 'relative',

  '@media': {
    [darkThemeQuery]: {
      color: vars.colors.white,
    },
    [laptopQuery]: {
      marginLeft: vars.space.md,
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
      background: `linear-gradient(90deg, ${colorValues.skyblue}, ${colorValues.violet}, ${colorValues.pink} 95%)`,
      borderRadius: vars.radius.md,
    },
  }
});

export const homeLink = style({
  display: 'none',
});

export const logoMargin = style({
  marginRight: 'auto',
  order: 1,
});

export const logoSVGFill = style({
  fill: vars.colors.blue,
  '@media': {
    [darkThemeQuery]: {
      fill: vars.colors.white,
    }
  }
});

export const linksGroup = style({
  display: 'flex',
  width: '100%',
  order: 4,
  justifyContent: 'space-between',
  alignItems: 'baseline',
  marginTop: vars.space.md,

  '@media': {
    [laptopQuery]: {
      order: 2,
      width: 'auto',
      marginTop: 0,
    }
  }
});

export const projectSelectWrap = style({
  position: 'relative',
  '@media': {
    [laptopQuery]: {
      marginLeft: vars.space.md,
    }
  },
})

export const projectSelectLabel = style([navLink, {
  cursor: 'pointer',
  '@media': {
    [laptopQuery]: {
      marginLeft: 0,
    }
  }
}]);

export const projectsListTitle = style([textXs, boldCaps, {
  color: vars.colors.blue,
  padding: vars.space['2xs'],
  margin: 0,
  textAlign: 'center',
  fontWeight: vars.fontWeights.normal,
}]);

export const projectsList = style({
  background: vars.colors.white,
  position: 'absolute',
  listStyle: 'none',
  padding: 0,
  borderRadius: vars.radius.sm,
  boxShadow: `0 2px 15px rgba(0, 0, 0, 0.10)`,
  zIndex: 350,
  width: '200%',
  left: '-50%',
  '@media': {
    [darkThemeQuery]: {
      boxShadow: `0 2px 15px rgba(0, 0, 0, 0.40)`
    },
  }
});

export const arrowDropdownButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  marginLeft: 0,
});

export const projectItem = style({
  padding: vars.space['2xs'],
  'selectors': {
    '&:first-child': {
      borderTopLeftRadius: vars.radius.sm,
      borderTopRightRadius: vars.radius.sm,
    },
    '&:last-child': {
      borderBottomLeftRadius: vars.radius.sm,
      borderBottomRightRadius: vars.radius.sm,
    }
  }
});

export const projectItemText = style({
  marginLeft: vars.space['2xs'],
});

export const projectItemHighlighted = style([projectItem, {
  background: 'rgba(38, 171, 232, 0.10);',
}]);

export const projectTitle = style([textXs, textBlue, {
  marginBottom: vars.space['3xs'],
  letterSpacing: vars.letterSpacing["2xl"],
  display: 'block',
  fontWeight: vars.fontWeights.bold,
  textTransform: 'uppercase',
}]);

export const projectVersion = style([textXs, {
  fontWeight: vars.fontWeights.normal,
  marginLeft: vars.space['3xs'],
  textTransform: 'none',
}]);

export const projectDescription = style([textXs, textBlue, {
  marginBottom: 0,
  display: 'block',
}]);

export const projectArrow = styleVariants({
  'closed': [fillBlueDashWhite, {
    transform: 'rotate(180deg)',
  }],
  'open': [fillBlueDashWhite]
});

export const projectLink = style({
  display: 'flex',
  flexFlow: 'row nowrap',
});

export const announcementsContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: vars.colors.violet,
  color: vars.colors.white,
  textAlign: "center",
  fontSize: vars.fontSize.sm,
  paddingLeft: vars.space['sm'],
  paddingRight: vars.space['sm'],
})

export const announcementsLink = style({
  color: vars.colors.white,
  textDecoration: 'underline'
})

export const announcementsEmoji = style({
  fontSize: vars.fontSize.xl,
  paddingRight: vars.space['2xs']
})