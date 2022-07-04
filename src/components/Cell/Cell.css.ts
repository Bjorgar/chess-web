import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '../../theme/theme.css';

const border = style({
  borderStyle: 'solid',
  borderWidth: '2px',
});

const cell = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80px',
  height: '80px',
  boxSizing: 'border-box',
});

const available = style({
  cursor: 'pointer',
  '::before': {
    content: '',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: 'blue',
  },
});

const danger = style({
  cursor: 'default',
  '::before': {
    content: '',
    position: 'absolute',
    zIndex: '10',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: 'darkred',
  },
});

const castling = style({
  cursor: 'pointer',
  '::before': {
    content: '',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: 'green',
  },
});

const attack = style({
  cursor: 'pointer',
  '::before': {
    content: '',
    position: 'absolute',
    zIndex: '10',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid red',
    backgroundColor: 'blue',
  },
});

export const cellType = styleVariants({
  available: [available],
  danger: [danger],
  castling: [castling],
  attack: [attack],
  standard: {},
});

export const cellCursor = styleVariants({
  pointer: { cursor: 'pointer' },
  default: {},
});

export const variant = styleVariants({
  primary: [cell, { backgroundColor: vars.color.dark }],
  secondary: [cell, { backgroundColor: vars.color.light }],
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
