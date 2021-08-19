import { style } from '@vanilla-extract/css';
import vars, { laptopQuery } from '../../styles/frontside-theme.css';

export const EntryPreview = style({
  marginBottom: vars.space.lg,

  '@media': {
    [laptopQuery]: {
      marginBottom: vars.space['xl'],
    }
  },

  'selectors': {
    '&:after': {
      content: '""',
      display: 'table',
      clear: 'both',
    }
  }

});

export const EntryPreviewImage = style({
  borderRadius: vars.radius.md,

  '@media': {
    [laptopQuery]: {
      float: 'left',
      marginRight: vars.space.lg,
      width: '33%',
      marginBottom: vars.space.xl,
    }
  }
});
