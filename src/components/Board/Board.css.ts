import { style } from '@vanilla-extract/css';

export const paper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '35px',
  height: `${80 * 8}px`,
});

export const board = style({
  position: 'relative',
  height: 'inherit',
  width: `${80 * 8}px`,
});

export const playField = style({
  display: 'flex',
  flexWrap: 'wrap',
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

export const turn = style({
  textAlign: 'center',
  fontFamily: 'sans-serif',
});
