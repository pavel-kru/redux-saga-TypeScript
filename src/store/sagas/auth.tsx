import { put, call, delay } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actionsTypes';

export function* checkAuthTimeout(msec: any): any {
  yield delay(msec);
  yield call(logout);
}

export function* logout(): any {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
}

export function* login(action: any): any {
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYPuEDFLF_9B5KtcQxGPCOi-wrhq47Dxc';
  if (action.isSignIn) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYPuEDFLF_9B5KtcQxGPCOi-wrhq47Dxc';
  }
  const getRequest = async (): Promise<any> => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(authData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error.message + '');
    }
    return data;
  };
  try {
    const data: { localId: string; idToken: string; expiresIn: number } = yield call(getRequest);
    const expirationTime: number = yield new Date().getTime() + data.expiresIn * 1000;
    const expirationDate = new Date(expirationTime);

    yield localStorage.setItem('token', data.idToken);
    yield localStorage.setItem('expirationDate', `${expirationDate}`);
    yield localStorage.setItem('userId', data.localId);
    yield put({
      type: LOGIN_SUCCESS,
      userId: data.localId,
      token: data.idToken,
    });
    yield call(checkAuthTimeout, data.expiresIn * 1000);
  } catch (error) {
    yield put({
      type: LOGIN_FAIL,
      payload: error.message.split('_').join(' '),
    });
  }
}

export function* authCheckStateSaga(): any {
  const expirationDate = localStorage.getItem('expirationDate');
  const token = localStorage.getItem('token');
  if (!token) {
    yield call(logout);
  } else if (expirationDate) {
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
