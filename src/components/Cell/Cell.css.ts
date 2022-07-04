import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

const border = style({
  borderStyle: 'solid',
  borderWidth: '2px',
});

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

export const cellType = styleVariants({
  available: { backgroundColor: 'blue' },
  danger: { backgroundColor: 'darkred' },
  castling: { backgroundColor: 'green' },
  standard: {},
});

export const blackBorder = style([
  border,
  {
    borderColor: 'blue',
  },
]);

export const whiteBorder = style([
  border,
  {
    borderColor: 'red',
  },
]);

export const figureImg = style({
  height: '90%',
});
