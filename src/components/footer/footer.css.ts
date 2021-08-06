import { atoms } from '../atoms.css.ts';

export const NavLinkStyle = atoms({
  paddingX: 'large',
  paddingY: 'medium',
  color: { default: 'fs-blue', darkMode: 'white' },
  textDecoration: 'none',
  fontFamily: 'fs',
  textSize: 'lg',
});

export const AddressStyle = atoms({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: { default: 'fs-blue', darkMode: 'white' },
  fontFamily: 'fs',
  textSize: 'sm',
});

export const NoMargin = atoms({ marginY: 'none' });
