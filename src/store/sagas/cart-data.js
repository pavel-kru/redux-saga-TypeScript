import { put, call } from 'redux-saga/effects';
import { replaceCart } from '../actions/cart-actions';
import { pendigNotification, successNotification, errorNotification } from '../actions/notification-actions';

const PATH = 'https://http-test-ba6d3-default-rtdb.firebaseio.com/cart.json';

export function* getCartData() {
  const getRequest = async () => {
    const response = await fetch(PATH);
    if (!response.ok) {
      throw new Error('Fetching cart data failed.');
    }
    const data = await response.json();
    return data;
  };
  try {
    const cartData = yield call(getRequest);
    yield put(replaceCart(cartData));
  } catch (error) {
    yield put(errorNotification());
  }
}

export function* putCartData(action) {
  yield put(pendigNotification());
  const sendRequest = async () => {
    const response = await fetch(PATH, {
      method: 'PATCH',
      body: JSON.stringify({
        items: action.cart.items,
        totalQuantity: action.cart.totalQuantity,
        userId: action.cart.userId,
      }),
    });

    if (!response.ok) {
      throw new Error('Sending cart data failed.');
    }
  };
  try {
    yield sendRequest();
    yield put(successNotification());
  } catch (error) {
    yield put(errorNotification());
  }
}
