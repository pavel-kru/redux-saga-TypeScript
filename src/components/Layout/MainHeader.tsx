import React from 'react';
import { useDispatch } from 'react-redux';

import { LOGOUT, OPEN_LOGIN_FORM } from '../../store/actionsTypes';
import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';

// const isLoggedSelector = createSelector(
//   (state) => state.auth,
//   (auth) => auth.formIsShown
// );

const MainHeader: React.FC<{isAuth: boolean}> = ({ isAuth }) => {
  const dispatch = useDispatch();
  const openLoginFormHandler = () => dispatch({ type: OPEN_LOGIN_FORM });
  const logoutHandler = () => dispatch({ type: LOGOUT });
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton />
            <button onClick={isAuth === true ? logoutHandler : openLoginFormHandler}>{isAuth === true ? 'LOGOUT' : 'LOGIN'}</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
