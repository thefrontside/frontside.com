import { style } from '@vanilla-extract/css';
import { tagList } from '../../styles/page.css';
import vars, { darkThemeQuery, laptopQuery } from '../../styles/frontside-theme.css';
import { heading2, textMd } from '../../styles/typography.css';

export const tabsListNav = style({
  '@media': {
    [laptopQuery]: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
    }
  }
});

export const tabsList = style([tagList, {
  flexFlow: 'row nowrap',
  alignContent: 'center',
}])

export const tabButton = style([textMd, {
  fontFamily: vars.fontFamily.main,
  cursor: 'pointer',
  outline: 'none',
  border: 'none',
  background: vars.colors.blue,
  color: vars.colors.white,
  padding: vars.space['2xs'],
  paddingRight: vars.space['sm'],
  paddingLeft: vars.space['sm'],
  borderRadius: vars.radius['md'],
  marginRight: '0.15rem',
  opacity: 0.7,

  'selectors': {
    '&[aria-selected="true"]': {
      background: vars.colors.violet,
      opacity: 1,
    }
  },
  '@media': {
    [laptopQuery]: {
      marginLeft: vars.space['3xs'],
      marginRight: vars.space['3xs'],
      borderRadius: vars.radius['xl'],
      marginBottom: vars.space.md,
    }
  }
}]);

export const tabPane = style({
  background: vars.colors.violet,
  color: vars.colors.white,
  padding: vars.space['sm'],
  borderRadius: vars.radius['md'],
  '@media': {
    [laptopQuery]: {
      padding: vars.space['lg'],
    }
  }
});

export const tabsTitle = style([heading2, {
  textAlign: 'center',
  '@media': {
    [laptopQuery]: {
      textAlign: 'left',
      marginRight: vars.space.sm,
    }
  }
}]);
