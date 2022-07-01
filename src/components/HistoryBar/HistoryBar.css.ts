import { style } from '@vanilla-extract/css';

export const historyWrapper = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '400px',
});

export const header = style({
  fontFamily: 'sans-serif',
  fontWeight: 'lighter',
  width: '100%',
  backgroundColor: '#47bfbd',
  textAlign: 'center',
  margin: '0',
  marginBottom: '10px',
  padding: '10px',
  boxSizing: 'border-box',
});

export const history = style({
  width: '100%',
  height: 'inherit',
  border: '2px solid grey',
  borderColor: 'black',
  borderRadius: '5px',
});

export const list = style({
  listStyle: 'none',
  textTransform: 'uppercase',
  margin: '0',
  padding: '0',
});

export const listItem = style({
  padding: '5px',
  borderBottom: '1px solid black',
});
