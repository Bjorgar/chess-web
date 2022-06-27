import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const board = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const table = style({
  borderCollapse: 'collapse',
  width: '800px',
});

const cell = style({
  height: '100px',
  width: '100px',
  border: '1px solid black',
});

export const variant = styleVariants({
  primary: [cell, { backgroundColor: vars.color.dark }],
  secondary: [cell, { backgroundColor: vars.color.light }],
});
