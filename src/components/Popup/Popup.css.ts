import { style, styleVariants } from '@vanilla-extract/css';

export const popupWrapper = style({
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const variants = styleVariants({
  open: [popupWrapper],
  close: { display: 'none' },
});

export const popupWindow = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '500px',
  height: '400px',
  backgroundColor: '#cedff5',
});

export const text = style({
  textAlign: 'center',
});

export const close = style({
  display: 'box',
  position: 'absolute',
  top: '5px',
  right: '5px',
  width: '25px;',
  height: '25px',
  borderRadius: '50%',
  background: 'f0b1b1',
  textAlign: 'center',
});
