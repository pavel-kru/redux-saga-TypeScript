import * as React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';

import { RootState } from './store/rootStore';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { initGetFetch, initPutFetch } from './store/actions/cart-actions';
import NotificationMessage from './components/UI/Notification';
import { LOGIN_AUTO_SIGNIN } from './store/actionsTypes';
import PrivateRoute from './routes/PrivateRoute';
import Spinner from './components/UI/Spinner/Spinner';

interface StateAuth {
  auth: { formIsShown: boolean; token: string };
}

interface notification {
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
  const cardIsVisible = useSelector<RootState>(state => state.ui.uiCardIsVisible, shallowEqual);
  const notification: notification = useSelector((state: { notification: notification }) => state.notification);
  const loginFormIsShown = useSelector(loginFormIsShownSelector);
  const isAuth = useSelector(isAuthSelector)?.length !== 0;
  const userId = useSelector((state: { auth: { userId: string } }) => state.auth.userId, shallowEqual);
  const cart = useSelector((state: { cart: any }) => state.cart, shallowEqual);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initGetFetch());
  }, [dispatch]);

  React.useEffect(() => dispatch<any>({ type: LOGIN_AUTO_SIGNIN }), [dispatch]);

  React.useEffect(() => {
    if (!firstPutFetch) {
      firstPutFetch = true;
      return;
    }

    dispatch(initPutFetch(cart, userId));
  }, [cart, userId, dispatch]);
  const privateRoute = React.useMemo(
    () => (
      <React.Suspense fallback={<Spinner />}>
        <ImportPrivatePage />
      </React.Suspense>
    ),
    [],
  );
  return (
    <>
      {notification && <NotificationMessage status={notification.status} title={notification.title} message={notification.message} />}
      <Layout isAuth={isAuth}>
        <React.Suspense fallback={<Spinner />}>{loginFormIsShown && <Auth />}</React.Suspense>
        {cardIsVisible && <Cart />}
        <PrivateRoute newcomponent={privateRoute} isAuth={isAuth} path='/' />
        <Products />
      </Layout>
    </>
  );
};

export default App;
