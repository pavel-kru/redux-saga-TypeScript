import { ADD_ITEM, REMOVE_ITEM, INIT_GET_FETCH, INIT_PUT_FETCH, REPLACE_CART } from '../actionsTypes';

export const addItem = (id: string, title: string, price: number, userId: string) => {
  return {
    type: ADD_ITEM,
    item: {
      id: id,
      title: title,
      price: price,
      totalAmount: price,
      quantity: 1,
      userId: userId
    },
  };
};

export const removeItem = (id: string) => {
  return {
    type: REMOVE_ITEM,
    id,
  };
};

export const initGetFetch = () => {
  return {
    type: INIT_GET_FETCH,
  };
};
export const initPutFetch = (cartChanged: boolean) => {
  return {
    type: INIT_PUT_FETCH,
    cart: cartChanged,
  };
};

export const replaceCart = (data: any) => {
  return {
    type: REPLACE_CART,
    payload: data,
  };
};
