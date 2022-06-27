import { variant } from '../Board.css';
import { FIELD_SIZE } from '../constants';

export function getField(idx?: number, isChild?: boolean): React.ReactNode {
  const items = [];
  const child = true;
  for (let i = 0; i < FIELD_SIZE; i++) {
    if (isChild) {
      const isPair = !!(idx as number % 2);
      const remnant = !!(i % 2);
      let variantType = '';

      if (isPair) {
        variantType = remnant ? variant.primary : variant.secondary;
      } else {
        variantType = remnant ? variant.secondary : variant.primary;
      }

      items.push(<td className={variantType} />);
    } else {
      items.push(
        <tr>{getField(i, child)}</tr>,
      );
    }
  }
  return items;
}
