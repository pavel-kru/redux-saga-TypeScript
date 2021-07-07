import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { RouteComponentProps } from '@reach/router';

import { RootState } from './store/roootStore';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { initGetFetch, initPutFetch } from './store/actions/cart-actions';
import Notification from './components/UI/Notification';
import { LOGIN_AUTO_SIGNIN } from './store/actionsTypes';
import PrivateRoute from './routes/PrivateRoute';
import Spinner from './components/UI/Spinner/Spinner';

interface StateAuth {
  auth: { formIsShown: boolean; token: string };
}

interface Notification {
  status: string;
  title: string;
  message: string;
}

let firstPutFetch = false;
const loginFormIsShownSelector = createSelector(
  (state: StateAuth) => state.auth,
  auth => auth.formIsShown,
);
const isAuthSelector = createSelector(
  (state: StateAuth) => state.auth,
  auth => auth.token,
);
const Auth = React.lazy(() => import('./components/Auth/Auth'));
const ImportPrivatePage = React.lazy(() => import('./components/AuthPage/AuthPage'));

const App: React.FC = () => {
  const cardIsVisible = useSelector<RootState>(state => state.ui.uiCardIsVisible);
  const notification: Notification = useSelector((state: { notification: Notification }) => state.notification);
  const loginFormIsShown = useSelector(loginFormIsShownSelector);
  const isAuth = useSelector(isAuthSelector)?.length !== 0;
  const cartChanged: boolean = useSelector(
    (state: {
      cart: {
        changed: boolean;
      };
    }) => state.cart.changed,
  );

  const dispatch = useDispatch<React.Dispatch<{ type: string }>>();

  React.useEffect(() => {
    dispatch(initGetFetch());
  }, [dispatch]);

  React.useEffect(() => dispatch({ type: LOGIN_AUTO_SIGNIN }), [dispatch]);

  React.useEffect(() => {
    if (!firstPutFetch) {
      firstPutFetch = true;
      return;
    }
    if (cartChanged) {
      dispatch(initPutFetch(cartChanged));
    }
  }, [cartChanged, dispatch]);

  const PrivatePage = React.useCallback(
    () => (
      <React.Suspense fallback={<Spinner />}>
        <ImportPrivatePage />
      </React.Suspense>
    ),
    [],
  );

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout isAuth={isAuth}>
        <React.Suspense fallback={<Spinner />}>{loginFormIsShown && <Auth />}</React.Suspense>
        {cardIsVisible && <Cart />}
        <PrivateRoute newcomponent={PrivatePage} isAuth={isAuth} path='/' />
        <Products />
      </Layout>
    </>
  );
};

export default App;
