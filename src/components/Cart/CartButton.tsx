import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toogleUiCard } from '../../store/actions/ui-actions';

import classes from './CartButton.module.css';
import { RootState } from '../../store/roootStore';

const CartButton: React.FC = () => {
  const totalQuantity = useSelector((state: { cart: { totalQuantity: number } }) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(toogleUiCard());
  };
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
