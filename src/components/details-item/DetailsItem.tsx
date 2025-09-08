import { useRef } from 'react';
import classNames from 'classnames';
import { useDrag, useDrop } from "react-dnd";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './DetailsItem.module.scss';
import { TIngredient, TOrderIngredient } from '../../services/store/slices/types';
import { deleteIngredientForOrder } from '../../services/store/slices/constructor/constructor.slice';
import { useAppDispath } from '../../services/store';

interface IProps {
  ingredient: TIngredient | TOrderIngredient,
  position?: string,
  id?: string,
  index?: number,
  moveItem?: ((dragIndex: number, hoverIndex: number) => void);
}
interface IElementProps {
  text: string,
  thumbnail: string,
  price: number,
  type?: 'top' | 'bottom',
  isLocked?: boolean,
  extraClass?: string,
  handleClose: (() => void);
}

export default function DetailsItem({ index, ingredient, position, moveItem }: IProps) {
  const itemRef = useRef<HTMLElement>(null);
  const { type, image, name, price } = ingredient;
  const isBun = type === 'bun';

  const [, dropTarget] = useDrop({
    accept: 'details-item',
    hover(item: { id: string, index: number }, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index as number;

      if (!itemRef.current || !moveItem) return;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = itemRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()!;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDraging }, dragRef] = useDrag({
    type: 'details-item',
    item: () => {
      if (isBun) return;
      return { id: ingredient._id, index };
    },
    collect: (monitor) => ({
      isDraging: monitor.isDragging(),
    })
  });

  const dispatch = useAppDispath();
  const deleteItem = () => {
    if (typeof index === 'number') {
      dispatch(deleteIngredientForOrder({ index }));
    }
  };

  const itemClasses = classNames(style.item, {
    [style.item_drag]: isDraging,
  });

  const props: IElementProps = {
    text: name as string,
    price: price as number,
    thumbnail: image as string,
    handleClose: deleteItem,
  };

  if (isBun) {
    props.text = `${name as string} ${position === 'top' ? '(верх)' : '(низ)'}`;
    props.isLocked = true;
    props.type = position as 'top' | 'bottom';
  }

  dragRef(dropTarget(itemRef));

  return (
    <li ref={(element) => { itemRef.current = element }} className={itemClasses}>
      <div className={style.iconContainer}>
        {!isBun && (<DragIcon type="primary" />)}
      </div>

      <ConstructorElement {...props} />
    </li>
  );
}
