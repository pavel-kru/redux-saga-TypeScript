import { ADD_ITEM, REMOVE_ITEM, INIT_GET_FETCH, INIT_PUT_FETCH, REPLACE_CART } from '../actionsTypes';

export const addItem = (id: string, title: string, price: number, userId: string): any => {
  return {
    type: ADD_ITEM,
    item: {
      id: id,
      title: title,
      price: price,
      totalAmount: price,
      quantity: 1,
      userId: userId,
    },
  };
};

export const removeItem = (id: string): any => {
  return {
    type: REMOVE_ITEM,
    id,
  };
};

export const initGetFetch = (): any => {
  return {
    type: INIT_GET_FETCH,
  };
};
export const initPutFetch = (cart: any, userId: string): any => {
  return {
    type: INIT_PUT_FETCH,
    cart: cart,
    userId: userId,
  };
};

export const replaceCart = (data: any): any => {
  return {
    type: REPLACE_CART,
    payload: data,
  };
};
