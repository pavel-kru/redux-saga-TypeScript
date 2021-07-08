import { getCartData, putCartData } from './cart-data';
import { INIT_GET_FETCH, INIT_PUT_FETCH, LOGIN_AUTO_SIGNIN, LOGIN_START, LOGOUT } from '../actionsTypes';
import { authCheckStateSaga, login, logout } from './auth';
import { takeEvery, all, takeLatest } from 'redux-saga/effects';

export function* watchCart(): any {
  yield takeEvery(INIT_GET_FETCH, getCartData);
  yield takeEvery(INIT_PUT_FETCH, putCartData);
}

export function* watchAuth(): any {
  yield all([takeLatest(LOGIN_START, login), takeEvery(LOGIN_AUTO_SIGNIN, authCheckStateSaga), takeEvery(LOGOUT, logout)]);
}
