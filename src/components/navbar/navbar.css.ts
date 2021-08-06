import { atoms } from '../atoms.css.ts';

export const NavItemStyle = atoms({
  paddingX: 'large',
  paddingY: 'medium',
});

export const NavLinkStyle = atoms({
  color: { default: 'fs-blue', darkMode: 'white' },
  textDecoration: 'none',
  fontFamily: 'fs',
  textSize: 'xl',
});

export const ContactButton = atoms({
  fontFamily: 'fs',
  textSize: 'xl',
  color: 'white',
  backgroundImage: 'fs-gradient',
  backgroundPosition: {
    default: 'left',
    hover: 'right',
  },
  paddingX: 'large',
  paddingY: 'medium',
  borderWidth: 'none',
  borderRadius: 'medium',
  borderStyle: 'solid',
  borderColor: 'fs-red',
  textAlign: 'center',
  transition: 'small',
  backgroundSize: 'large',
  boxShadow: 'default',
});

export const MenuSVGFill = atoms({
  fill: { default: 'fs-blue', darkMode: 'white' },
});

export const LogoSVGFill = atoms({
  fill: { darkMode: 'white', default: 'fs-blue' },
});

export const NavHorizontalList = atoms({
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
});

export const NavVerticalList = atoms({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  placeItems: 'flex-end',
});
