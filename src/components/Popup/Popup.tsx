import { useEffect, useState } from 'react';

import * as style from './Popup.css';
import { PopupProps } from './types';

export default function Popup({ notification }: PopupProps): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  const variant = isOpen ? style.variants.open : style.variants.open;

  useEffect(() => {
    if (notification) setOpen(true);
  }, [notification]);

  const clickHandler = () => {
    setOpen(false);
  };

  return (
    <div className={variant}>
      <div className={style.popupWindow}>
        <button
          className={style.close}
          type="button"
          onClick={clickHandler}
        >
          X
        </button>
        <h2 className={style.text}>{notification}</h2>
      </div>
    </div>
  );
}
