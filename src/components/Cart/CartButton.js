import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toogleUiCard } from '../../store/actions/ui-actions';

import classes from './CartButton.module.css';

const CartButton = props => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
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
