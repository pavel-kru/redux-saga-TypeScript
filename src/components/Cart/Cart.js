import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem.tsx';

const cartSelector = createSelector(
  state => state.cart,
  cart => cart.items,
);
// const errorSelector = createSelector(cartSelector, (state) => state.cart.totalQuantity, (items, qty) => !items.length && qty ? 'Something wrong' : undefined);

const Cart = () => {
  const cartItems = useSelector(cartSelector);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems?.length > 0 &&
          cartItems.map(item => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                total: item.totalAmount,
                price: item.price,
              }}
            />
          ))}
      </ul>
    </Card>
  );
};

export default Cart;
