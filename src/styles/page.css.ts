import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import vars, { laptopQuery, desktopQuery, darkThemeQuery } from './frontside-theme.css';
import { text4Xl, textXs } from "./typography.css";
import clientsLogo from '../img/q3-2021/client-logos.svg';
import clientsLogoWhite from '../img/q3-2021/client-logos-white.svg';
import backgroundBubbles from '../img/q3-2021/backgruond-blue-bubbles.png';
import openMicBg from '../img/q3-2021/backstage-openmic-bg.png';

import { boldCaps, textLg, textUppercase, textXl } from './typography.css';


export const testimonialCarousel = style({
  display: 'flex',
  margin: `0 ${vars.space.xl}`,
});
export const testimonialQuote = style({});
export const testimonialQuoteChar = style([text4Xl, {
  fontWeight: 'bold',
  fontSize: '5em',
}])

export const testimonialSource = style([textXs, {
  display: 'block',
  fontStyle: 'italic',
  marginTop: vars.space.xs,
}]);

export const testimonialWrap = style({
  padding: vars.space.sm,
  fontWeight: vars.fontWeights.bold,
  margin: `0 ${vars.space['3xs']}`,
  borderRadius: '1em',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: '1 1 0px',
  selectors: {
    '&:nth-of-type(odd)': {
      color: vars.colors.lightGreen,
      backgroundColor: vars.colors.blue,
      margin: '1em 0',
    },
    '&:nth-of-type(even)': {
      color: vars.colors.blue,
      backgroundColor: vars.colors.lightGreen,
    }
  }
});

export const pageWrap = style({
  boxSizing: 'border-box',
  width: '100%',
  padding: vars.space.sm,
  maxWidth: '37rem',
  margin: '0 auto',

  '@media': {
    [laptopQuery]: {
      padding: vars.space.md,
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

export const badgesWrap = style({
  display: 'block',
});

export const badgesHeader = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  fontSize: vars.fontSize.xl,
  fontWeight: vars.fontWeights.bold,
  lineHeight: vars.lineHeights.xl,
});

export const badgesTextBackstage = style({
  fontWeight: vars.fontWeights.normal,
});

export const badgesBody = style({
  margin: `${vars.space.md} ${vars.space.md}`,
  textAlign: 'center',
  display: 'grid',
  gridTemplateColumns: '2fr 2fr 4.5fr 2.5fr 4fr',
  gridTemplateRows: '1fr 2fr',
  gridColumnGap: vars.space.md,
});

export const badgeRibbon = style({
  gridRow: '1 / span 2',
})

export const badgeCaption = style({
  order: 1,
})

export const sideImage = style({
  flexShrink: 1,
  marginTop: vars.space.md,
  '@media': {
    [laptopQuery]: {
      marginTop: 0,
      width: calc('50%').subtract(vars.space.lg).toString(),
    }
  }
});

export const heroImage = style([sideImage, {
  '@media': {
    [laptopQuery]: {
      marginTop: calc(vars.space.md).negate().toString(),
    }
  }
}]);

export const heroPlayerForceSize = style({
  width: '100%',
  height: '100%',
  '@media': {
    [laptopQuery]: {
      width: '140%',
      height: '140%',
      marginLeft: '-20%',
      marginTop: '-18%',
      marginBottom: '-20%',
    }
  }
});

export const heroPlayerConsulting = style({
  width: '100%',
  height: '100%',
  '@media': {
    [laptopQuery]: {
      width: '110%',
      height: '110%',
      marginLeft: '-10%',
      marginTop: '-10%',
    }
  }
});

export const featurePlayerForceSize = style({
  width: '100%',
  height: '100%',
  '@media': {
    [laptopQuery]: {
      width: '120%',
      height: '120%',
      marginLeft: '-10%',
      marginTop: '-10%',
      marginBottom: '-10%',
    }
  }
});


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

export const featureImage = sideImage;

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
  '@media': {
    [darkThemeQuery]: {
      backgroundImage: `url(${clientsLogoWhite})`,
    }
  }
});

export const contentRow = style({
  marginBottom: vars.space['xl'],

  '@media': {
    [laptopQuery]: {
      display: 'flex',
      flexFlow: 'row nowrap',
      paddingLeft: vars.space.lg,
      paddingRight: vars.space.lg,
      alignItems: 'center',
    },
  }
});

export const contentShrink = style({
  minWidth: 'fit-content',
  flex: '0 5 auto'
});

export const contentGrow = style({
  flex: '5 0 auto'
});

export const logoFlex = style({
  display: 'flex',
  flexFlow: 'row wrap',
  alignItems: 'center',
  justifyContent: 'space-evenly'
});

export const logoItem = style({
  width: '100%',
  height: '100%',
  paddingLeft: vars.space.sm,
  flexBasis: vars.space['2xl'],
  flexGrow: 1
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
      order: 3,
      marginTop: 'auto',
    },
  }
});

export const highlightText = style({
  order: 2,
  '@media': {
    [laptopQuery]: {
      order: 1,
      marginBottom: vars.space.sm,
      marginTop: vars.space.xs,
    }
  },
});

export const highlightHeading = style([textXl, {
  fontWeight: vars.fontWeights.extrabold,
  marginBottom: vars.space.sm,
  '@media': {
    [laptopQuery]: {
      marginBottom: 0,
    }
  }
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
  marginBottom: vars.space['2xl'],
  marginTop: vars.space['2xl'],
  overflow: 'hidden',
  '@media': {
    [laptopQuery]: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      marginTop: vars.space['2xl'],
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
      minWidth: '800px',
      flexShrink: 0,
    }
  }
});

export const consultingTopTCA = style({
  marginTop: vars.space.md,
});

export const consultingCycleContainer = style({
  '@media': {
    [laptopQuery]: {
      display: 'grid',
      gridTemplateColumns: '0.8fr 1.4fr 0.8fr',
      gridTemplateRows: '1fr 1fr 1fr',
      gap: '1rem',
      gridTemplateAreas:
        `"First Illustration ."
        ". Illustration Second"
        "Third Illustration ."`
    }
  }
});

export const consultingCycleFirst = style({
  gridArea: 'First',
  marginTop: vars.space.lg,
});

export const consultingCycleSecond = style({
  gridArea: 'Second',
});

export const consultingCycleThird = style({
  gridArea: 'Third',
});

export const consultingCycleIllustration = style({
  display: 'none',
  '@media': {
    [laptopQuery]: {
      gridArea: 'Illustration',
      display: 'block',
    }
  }
});

export const consultingTab = style({
  '@media': {
    [laptopQuery]: {
      display: 'flex',
      alignItems: 'center',
    }
  }
});

export const consultingTabImage = style({
  display: 'none',
  '@media': {
    [laptopQuery]: {
      display: 'block',
      flexShrink: 0,
      marginLeft: vars.space.lg,
    },
    [desktopQuery]: {
      marginLeft: vars.space.xl,
    }
  }
})

export const backstageOpenMicBox = style({
  background: `${vars.colors.lightGreen} url(${openMicBg}) no-repeat`,
  backgroundPosition: '12rem center',
  backgroundSize: '100%',
  color: vars.colors.blue,
  borderRadius: vars.radius.lg,
  padding: vars.space.lg,
  paddingTop: vars.space.md,
  boxSizing: 'border-box',
  marginBottom: vars.space.lg,

  '@media': {
    [laptopQuery]: {
      width: '66%',
      backgroundPosition: '20rem center',
    }
  }
});

export const backstageOpenMicLine = style({
  border: 'none',
  height: '3px',
  background: vars.colors.blue,
  marginTop: vars.space.xl,
});

export const contactTypeform = style({
  width: '100%',
  height: '40rem',
  '@media': {
    [laptopQuery]: {
      height: '35rem',
    }
  }
});

export const contactTitle = style({
  maxWidth: '720px', // to match typeform container
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: vars.space.md,
});

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate3d(0, -100%, 0)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)'
  }
});

export const ctaSubmittedBox = style([textLg, {
  animationName: fadeIn,
  animationDuration: calc('1s').multiply(0.75).toString(),
}]);

export const testimonialBlock = style({

});

export const comparisonChartGrid = style({
  backgroundColor: '#fafafa'
});

export const comparisonChartTable = style({
  borderCollapse: 'collapse',
  width: '80%',
  margin: '0 auto'
});

export const tableCellLeft = style({
  padding: '1.25em',
  textAlign: 'left',
  verticalAlign: 'middle',
  fontWeight: '600'
});

export const tableCellLeftHeader = style([boldCaps, {
  textAlign: 'left',
}]);

export const rowBorder = style({
  borderBottom: '1px solid #e4e4e4'
});

globalStyle('th, td', {
  padding: '1.25em',
  textAlign: 'center',
  verticalAlign: 'middle'
});
