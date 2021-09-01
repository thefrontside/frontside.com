import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import vars, { laptopQuery, desktopQuery, darkThemeQuery } from './frontside-theme.css';
import clientsLogo from '../img/q3-2021/client-logos.svg';
import clientsLogoWhite from '../img/q3-2021/client-logos-white.svg';

export const PageWrap = style({
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

// vanilla-extract composeStyles doesn't work, so we need to re-write
export const HeroWrap = style({
  boxSizing: 'border-box',
  width: '100vw',
  overflow: 'hidden',
  padding: vars.space.md,

  '@media': {
    [laptopQuery]: {
      maxWidth: vars.pixelBase.maxWdith,
      margin: '0 auto',
      display: 'flex',
      flexFlow: 'row nowrap',
    },
  }
});

export const HeroText = style({
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

export const HeroBreak = style({
  display: 'none',
  '@media': {
    [laptopQuery]: {
      display: 'block',
    }
  }
});

export const HeroImage = style({
  flexShrink: 1,
})

export const FeatureText = style({
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

// vanilla-extract composeStyles doesn't work, so we need to re-write
export const FeatureTextAlternate = style({
  '@media': {
    [laptopQuery]: {
      boxSizing: 'border-box',
      width: calc('50%').add(vars.space.lg).toString(),
      paddingLeft: vars.space.lg,
      flexShrink: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',
      order: 2
    },
    [desktopQuery]: {
      width: calc(vars.pixelBase.maxWdith).subtract(vars.space.lg).subtract(vars.space.lg).divide(2).toString(),
    },
  }
});

export const FeatureImage = HeroImage;

export const AboutTeamImg = style({
  width: '15rem',
  borderRadius: vars.radius.md,
});

export const FeatureRow = style({
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

export const ClientLogos = style({
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

export const SectionHeader = style({
  textAlign: 'center',
  maxWidth: '31.136rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: vars.space.lg,
});

export const ColumnedHighlights = style({
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

export const Highlight = style({
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

export const HighlightImage = style({
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

export const HighlightText = style({
  order: 2,
  '@media': {
    [laptopQuery]: {
      order: 1,
    }
  },
});

// vanilla-extract composeStyles doesn't work, so we need to re-write
export const HighlightHeading = style({
  fontSize: vars.fontSize['xl'],
  lineHeight: vars.lineHeights['xl'],
  letterSpacing: vars.letterSpacing['xl'],
  fontWeight: vars.fontWeights.extrabold,
});


// vanilla-extract composeStyles doesn't work, so we need to re-write
export const AboutHighlight = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  paddingLeft: vars.space.md,
  paddingRight: vars.space.md,
  marginBottom: vars.space.md,
  textAlign: 'left',
  '@media': {
    [laptopQuery]: {
      boxSizing: 'border-box',
      width: calc('100%').divide(3).toString(),
      paddingLeft: vars.space.sm,
      paddingRight: vars.space.sm,
    },
    [desktopQuery]: {
      paddingLeft: vars.space.md,
      paddingRight: vars.space.md,
    },
  }
});

export const AboutHighlightDecor = style({
  marginLeft: 'auto',
  zoom: '50%'
});

export const CardList = style({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center'
});

export const Card = style({
  background: vars.colors.blue,
  color: vars.colors.white,
  padding: vars.space['2xs'],
  maxWidth: '24rem',
  borderRadius: '0.5rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: vars.space.lg
});

export const CardImage = style({
  borderRadius: '0.5rem',
  order: 1,
});

export const EntriesList = style({
  listStyle: 'none',
  padding: 0,
  
  '@media': {
    [laptopQuery]: {
      paddingLeft: vars.space.lg,
      paddingRight: vars.space.lg,
    }
  }
})
