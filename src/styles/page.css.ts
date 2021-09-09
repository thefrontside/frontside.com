import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import vars, { laptopQuery, desktopQuery, darkThemeQuery } from './frontside-theme.css';
import clientsLogo from '../img/q3-2021/client-logos.svg';
import clientsLogoWhite from '../img/q3-2021/client-logos-white.svg';
import backgroundBubbles from '../img/q3-2021/backgruond-blue-bubbles.png';

import { textLg, textUppercase, textXl } from './typography.css';

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
  marginTop: vars.space.md,
  '@media': {
    [laptopQuery]: {
      marginTop: 0,
    }
  }
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

export const aboutTeamList = style({
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const featureRow = style({
  marginBottom: vars.space['xl'],

  '@media': {
    [laptopQuery]: {
      display: 'flex',
      flexFlow: 'row nowrap',
      paddingLeft: vars.space.lg,
      paddingRight: vars.space.lg,
      alignItems: 'center',
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
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
    },
  }
});

export const columnThird = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'stretch',
  '@media': {
    [laptopQuery]: {
      boxSizing: 'border-box',
      width: calc('100%').divide(3).toString(),
    },
  }
});

export const highlight = style([columnThird, {
  textAlign: 'center',
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,

  '@media': {
    [laptopQuery]: {
      paddingLeft: vars.space.sm,
      paddingRight: vars.space.sm,
    },
    [desktopQuery]: {
      paddingLeft: vars.space.lg,
      paddingRight: vars.space.lg,
    },
  }
}]);

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

export const entryColumns = style([columnedhighlights, {
  marginTop: vars.space.xl,
}]);

export const entryColumn = style([columnThird, {
  textAlign: 'left',
  '@media': {
    [laptopQuery]: {
      width: calc('100%').divide(3).subtract(vars.space.md).toString(),
    },
    [desktopQuery]: {
      width: calc('100%').divide(3).subtract(vars.space.lg).toString(),
    },
  }
}]);

export const aboutHighlight = style([highlight, {
  marginBottom: vars.space.md,
  textAlign: 'left',
}]);

export const aboutHighlightDecor = style({
  marginLeft: 'auto',
  zoom: '50%'
});

export const aboutHighlightDecorMarginFix = style({
  marginLeft: 'auto',
});

export const aboutHighlightHeading = style([textLg, textUppercase, {
  lineHeight: vars.lineHeights.base,
}]);

export const entriesList = style({
  listStyle: 'none',
  padding: 0,

  '@media': {
    [laptopQuery]: {
      paddingLeft: vars.space.lg,
      paddingRight: vars.space.lg,
    }
  }
});

export const entriesListEntry = style({
  marginBottom: vars.space.lg,
  '@media': {
    [laptopQuery]: {
      marginBottom: vars.space.xl,
    }
  }
});

export const radiusMd = style({
  borderRadius: vars.radius.md,
});

export const tagList = style({
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
});

export const tagListItem = style({
  display: 'block',
  margin: vars.space.sm,
});

export const tagListLine = style({
  listStyle: 'none',
  padding: 0,
  marginTop: vars.space.lg,
});

export const tagListLineItem = style({
  display: 'inline-block',
  marginRight: vars.space.xs,
});

export const paginationWrap = style({
  marginTop: vars.space.md,
  textAlign: 'center',
});

export const caseStudySection = style({
  background: `${vars.colors.blue} url(${backgroundBubbles}) no-repeat`,
  backgroundPosition: 'center center',
  color: vars.colors.white,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  textAlign: 'center',
  '@media': {
    [laptopQuery]: {
      padding: `${vars.space.lg} ${vars.space['3xl']}`
    }
  }
});

export const homeTopCTA = style({
  marginBottom: vars.space['2xl'],
  textAlign: 'center',
});

export const homeBottomCTA = style({
  marginTop: vars.space.lg,
  marginBottom: vars.space.lg,
  textAlign: 'center',
});

export const homeBottomCTAtext = style([textLg, {
  marginBottom: vars.space.md,
}]);

export const homeGraphRow = style({
  '@media': {
    [laptopQuery]: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      marginTop: vars.space['2xl'],
      marginBottom: vars.space['2xl'],
    }
  }
});

export const homeGraphText = style({
  textAlign: 'center',

  '@media': {
    [laptopQuery]: {
      paddingLeft: vars.space.sm,
      paddingRight: vars.space.sm,
    }
  }
})

export const homeGraphImage = style({
  display: 'none',
  '@media': {
    [laptopQuery]: {
      display: 'block',
      width: '60%',
      flexShrink: 0,
    }
  }
});

export const consultingTopTCA = style({
  marginTop: vars.space.md,
});
