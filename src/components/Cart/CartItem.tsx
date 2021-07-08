import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeItem, addItem } from '../../store/actions/cart-actions';
import classes from './CartItem.module.css';

interface Props {
  item: {
    title: string;
    quantity: number;
    price: number;
    total: number;
    id: string;
  };
}

const CartItem: React.FC<Props> = props => {
  const { title, quantity, total, price, id } = props.item;

  const userId = useSelector((state: { auth: { userId: '' } }) => state.auth.userId);
  const dispatch = useDispatch();
  const addToCartHandler = (): any => {
    dispatch(addItem(id, title, price, userId));
  };
  const removeItemFromCartHandler = (): any => {
    dispatch(removeItem(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)} <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>+</button>
          <button onClick={removeItemFromCartHandler}>-</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
