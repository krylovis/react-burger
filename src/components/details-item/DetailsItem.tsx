import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './DetailsItem.module.scss';
import { deleteIngredientForOrder } from '../../services/store/slices/ingredients/ingredients.slice';
import { useAppDispath } from '../../services/store';

interface IProps {
  ingredient: Record<string, string | number>,
  position?: string,
  id?: string,

}
interface IElementProps {
  text: string,
  thumbnail: string,
  price: number,
  type?: 'top' | 'bottom' | undefined,
  isLocked?: boolean | undefined,
  extraClass?: string | undefined,
  handleClose: (() => void) | undefined;
}

export default function DetailsItem({ id, ingredient, position }: IProps) {
  const { type, image, name, price } = ingredient;
  const isBun = type === 'bun';

  const dispatch = useAppDispath();
  const deleteItem = () => {
    dispatch(deleteIngredientForOrder({ itemId: id as string }));
  };

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

  return (
    <li className={style.item}>
      <div className={style.iconContainer}>
        {!isBun && (<DragIcon type="primary" />)}
      </div>

      <ConstructorElement {...props} />
    </li>
  );
}
