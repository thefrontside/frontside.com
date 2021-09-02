import { style, styleVariants } from '@vanilla-extract/css';
import vars, { darkThemeQuery, desktopQuery, laptopQuery } from '../../styles/frontside-theme.css';
import { textBlueDashWhite, textSmCaps, textXl } from '../../styles/typography.css';

const base = style([textBlueDashWhite, {
  display: 'flex',
  flexFlow: 'column nowrap',
}])

const sided = style([base, {
  '@media': {
    [laptopQuery]: {
      flexFlow: 'row nowrap',
    }
  }
}]);

export const entryPreview = styleVariants({
  default: [base],

  sided: [sided],

  featured: [sided]
});

export const entryPreviewImage = styleVariants({
  default: {
    marginBottom: vars.space.xs,
  },

  sided: {
    marginBottom: vars.space.xs,

    '@media': {
      [laptopQuery]: {
        marginRight: vars.space.lg,
        width: '33%',
        flexShrink: 0,
      }
    },
  },

  featured: {
    marginBottom: vars.space.xs,
    '@media': {
      [laptopQuery]: {
        marginRight: vars.space.md,
        width: '40%',
        maxWidth: '600px',
        flexShrink: 0,
      },
      [desktopQuery]: {
        width: '600px',
      }
    },
  }
});

export const entryPreviewText = style({

});

export const entryPreviewHeading = style([textXl, {
  marginTop: 0,
}]);

export const entryPreviewNewBadge = style([{
  display: 'inline-block',
  backgroundColor: vars.colors.blue,
  color: vars.colors.white,
  borderRadius: vars.radius.sm,
  fontSize: vars.fontSize.sm,
  paddingLeft: vars.space['xs'],
  paddingRight: vars.space['xs'],
  paddingTop: vars.space['3xs'],
  paddingBottom: vars.space['3xs'],
  marginBottom: vars.space.xs,
  fontWeight: vars.fontWeights.bold,
  
  '@media': {
    [darkThemeQuery]: {
      backgroundColor: vars.colors.white,
      color: vars.colors.blue,
    }
  }
}]);
