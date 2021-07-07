import { put, call, delay } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actionsTypes';

export function* checkAuthTimeout(msec: any): any {
  yield delay(msec);
  yield call(logout);
}

export function* logout() {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
}

export function* login(action: any) {
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYPuEDFLF_9B5KtcQxGPCOi-wrhq47Dxc';
  if (action.isSignIn) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYPuEDFLF_9B5KtcQxGPCOi-wrhq47Dxc';
  }
  const getRequest = async () => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(authData),
    });

    const data = await response.json();

    if (!response.ok) {
      // console.log(data.error.message);
      throw new Error(data.error.message + '');
    }
    return data;
  };
  try {
    const data: { localId: string; idToken: string; expiresIn: number } = yield call(getRequest);
    const expirationDate: string = yield new Date(new Date().getTime() + data.expiresIn * 1000);
    yield localStorage.setItem('token', data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', data.localId);
    yield put({
      type: LOGIN_SUCCESS,
      userId: data.localId,
      token: data.idToken,
    });
    yield call(checkAuthTimeout, expirationDate);
  } catch (error) {
    yield put({
      type: LOGIN_FAIL,
      payload: error.message.split('_').join(' '),
    });
  }
}

export function* authCheckStateSaga() {
  const expirationDate = localStorage.getItem('expirationDate');
  const token = localStorage.getItem('token');
  if (!expirationDate) {
    yield call(logout);
  } else {
    const newExpirationDate: Date = yield new Date(expirationDate);
    if (newExpirationDate <= new Date()) {
      yield call(logout);
    } else {
      const userId = localStorage.getItem('userId');
      yield put({
        type: LOGIN_SUCCESS,
        userId: userId,
        token: token,
      });
      const timeBeforeAutoLogout = newExpirationDate.getTime() - new Date().getTime();
      yield call(checkAuthTimeout, timeBeforeAutoLogout);
    }
  }
}
