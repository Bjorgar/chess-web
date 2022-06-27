import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

export const paper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const cell = style({
  border: '1px solid black',
});

export const variant = styleVariants({
  primary: [cell, { backgroundColor: vars.color.dark }],
  secondary: [cell, { backgroundColor: vars.color.light }],
});

export const board = style({
  position: 'relative',
  height: '700px',
  width: '700px',
});

export const table = style({
  borderCollapse: 'collapse',
  height: 'inherit',
  width: 'inherit',
});

export const numbers = style({
  position: 'absolute',
  marginLeft: '-30px',
  display: 'flex',
  flexDirection: 'column',
  height: 'inherit',
  width: '30px',
});

export const letters = style({
  position: 'absolute',
  width: 'inherit',
  display: 'flex',
  height: '30px',
  marginBottom: '-30px',
});

export const mark = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1,
  textTransform: 'uppercase',
});
