import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { addItem } from '../../store/actions/cart-actions';

const userIdSelector = createSelector(
  (state: { auth: { userId: string } }) => state.auth,
  auth => auth.userId,
);

interface Props {
  title: string;
  price: number;
  description: string;
  id: string;
}

const ProductItem: React.FC<Props> = props => {
  const { title, price, description, id } = props;

  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const addToCartHandler = (): any => {
    dispatch(addItem(id, title, price, userId));
  };

  return (
    <li className={classes.item}>
      <Card className=''>
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
