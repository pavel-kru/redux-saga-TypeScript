import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { addItem } from '../../store/actions/cart-actions';

const userIdSelector = createSelector(
  state => state.auth,
  auth => auth.userId,
);

const ProductItem = props => {
  const { title, price, description, id } = props;

  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const addToCartHandler = () => {
    dispatch(addItem(id, title, price, userId));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};
export default ProductItem;
