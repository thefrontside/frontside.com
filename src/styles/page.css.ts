import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import vars, { laptopQuery, desktopQuery, darkThemeQuery } from './frontside-theme.css';
import clientsLogo from '../img/q3-2021/client-logos.svg';
import clientsLogoWhite from '../img/q3-2021/client-logos-white.svg';
import { textXl } from './typography.css';

export const pageWrap = style({
  boxSizing: 'border-box',
  width: '100vw',
  overflow: 'hidden',
  padding: vars.space.md,

  '@media': {
    [laptopQuery]: {
      maxWidth: vars.pixelBase.maxWdith,
    },
    [desktopQuery]: {
      margin: '0 auto'
    },
  }
});

export const heroWrap = style([pageWrap, {
  '@media': {
    [laptopQuery]: {
      margin: '0 auto',
      display: 'flex',
      flexFlow: 'row nowrap',
    },
  }
}]);

export const heroText = style({
  '@media': {
    [laptopQuery]: {
      boxSizing: 'border-box',
      width: '50%',
      paddingRight: vars.space.lg,
      flexShrink: 0,
    },
    [desktopQuery]: {
      boxSizing: 'border-box',
      width: calc(vars.pixelBase.maxWdith).divide(2).toString(),
      paddingRight: vars.space.lg,
      flexShrink: 0,
    },
  }
});

export const heroBreak = style({
  display: 'none',
  '@media': {
    [laptopQuery]: {
      display: 'block',
    }
  }
});

export const heroImage = style({
  flexShrink: 1,
})

export const featureText = style({
  '@media': {
    [laptopQuery]: {
      boxSizing: 'border-box',
      width: calc('50%').add(vars.space.lg).toString(),
      paddingRight: vars.space.lg,
      flexShrink: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',
    },
    [desktopQuery]: {
      width: calc(vars.pixelBase.maxWdith).subtract(vars.space.lg).subtract(vars.space.lg).divide(2).toString(),
    },
  }
});

export const featureTextAlternate = style([featureText, {
  '@media': {
    [laptopQuery]: {
      paddingLeft: vars.space.lg,
      paddingRight: 0,
      order: 2
    },
  }
}]);

export const featureImage = heroImage;

export const aboutTeamImg = style({
  width: '15rem',
  borderRadius: vars.radius.md,
});

export const featureRow = style({
  marginBottom: vars.space.lg,

  '@media': {
    [laptopQuery]: {
      display: 'flex',
      flexFlow: 'row nowrap',
      paddingLeft: vars.space.lg,
      paddingRight: vars.space.lg,
      alignItems: 'stretch',
      justifyContent: 'center'
    },
  }
});

export const clientLogos = style({
  backgroundImage: `url(${clientsLogo})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  width: '100%',
  height: '42px',
  textIndent: '-1000px',
  overflow: 'hidden',
  marginTop: vars.space.lg,
  marginBottom: vars.space['2xl'],
  '@media': {
    [darkThemeQuery]: {
      backgroundImage: `url(${clientsLogoWhite})`,
    }
  }
});

export const sectionHeader = style({
  textAlign: 'center',
  maxWidth: '31.136rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: vars.space.lg,
});

export const columnedhighlights = style({
  display: 'flex',
  flexFlow: 'column wrap',
  listStyle: 'none',
  paddingLeft: '0',

  '@media': {
    [laptopQuery]: {
      display: 'flex',
      flexFlow: 'row wrap'
    },
  }
});

export const highlight = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  textAlign: 'center',
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
  alignItems: 'stretch',

  '@media': {
    [laptopQuery]: {
      boxSizing: 'border-box',
      width: calc('100%').divide(3).toString(),
      paddingLeft: vars.space.sm,
      paddingRight: vars.space.sm,
    },
    [desktopQuery]: {
      paddingLeft: vars.space.lg,
      paddingRight: vars.space.lg,
    },
  }
});

export const highlightImage = style({
  order: 0,
  width: '15rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media': {
    [laptopQuery]: {
      order: 3
    },
  }
});

export const highlightText = style({
  order: 2,
  '@media': {
    [laptopQuery]: {
      order: 1,
    }
  },
});

export const highlightHeading = style([textXl, {
  fontWeight: vars.fontWeights.extrabold,
}]);

export const aboutHighlight = style([highlight, {
  marginBottom: vars.space.md,
  textAlign: 'left',
}]);

export const aboutHighlightDecor = style({
  marginLeft: 'auto',
  zoom: '50%'
});

export const cardList = style({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center'
});

export const card = style({
  background: vars.colors.blue,
  color: vars.colors.white,
  padding: vars.space['2xs'],
  maxWidth: '24rem',
  borderRadius: '0.5rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: vars.space.lg
});

export const cardImage = style({
  borderRadius: '0.5rem',
  order: 1,
});

export const entriesList = style({
  listStyle: 'none',
  padding: 0,
  
  '@media': {
    [laptopQuery]: {
      paddingLeft: vars.space.lg,
      paddingRight: vars.space.lg,
    }
  }
})
