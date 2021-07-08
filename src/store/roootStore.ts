import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { uiReducer } from '../store/reducers/ui';
import { cartReducer } from '../store/reducers/cart';
import { notificationReducer } from '../store/reducers/notification';

import { watchAuth, watchCart } from '../store/sagas';
import { authReducer } from '../store/reducers/auth';

const rootReducer = combineReducers({
  ui: uiReducer,
  cart: cartReducer,
  notification: notificationReducer,
  auth: authReducer,
});

const sagaMiddleWare = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;
export const storefege = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleWare)));
sagaMiddleWare.run(watchCart);
sagaMiddleWare.run(watchAuth);

export type RootState = ReturnType<typeof rootReducer>;
