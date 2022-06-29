import { RefObject, useEffect } from 'react';

interface OutsideClickArgs {
  isActive: boolean;
  ref: RefObject<HTMLElement>
  callback: () => void;
}

export function useOutsideClick({
  isActive,
  ref,
  callback,
}: OutsideClickArgs) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !isActive) return;

    const clickHandler = ({ target }: MouseEvent) => {
      console.log('this');
      if (!element.contains(target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', clickHandler);

    return () => document.removeEventListener('click', clickHandler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, isActive]);
}
