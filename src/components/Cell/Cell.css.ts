import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

const cell = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80px',
  height: '80px',
  boxSizing: 'border-box',
});

export const variant = styleVariants({
  primary: [cell, { backgroundColor: vars.color.dark }],
  secondary: [cell, { backgroundColor: vars.color.light }],
});

export const border = styleVariants({
  active: {
    border: '2px solid red',
  },
  inactive: {
    border: 'none',
  },
});

export const figureImg = style({
  height: '90%',
});

export const bright = style({
  backgroundColor: 'blue',
});
