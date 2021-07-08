import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import styles from './auth.module.scss';

import Input from '../UI/Input';
import Spinner from '../UI/Spinner/Spinner';
import { LOGIN_START, LOGOUT } from '../../store/actionsTypes';
import { checkValidity } from '../../utility';

interface State {
  auth: { loading: boolean; error: string };
}

const initialForm = {
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      label: 'E-mail',
    },
    value: '',
    validation: { required: true, isMail: true },
    valid: false,
    touched: false,
  },
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      label: 'Password',
    },
    value: '',
    validation: { required: true, minLength: 6 },
    valid: false,
    touched: false,
  },
};

const isLoadingSelector = createSelector(
  (state: State) => state.auth,
  auth => auth.loading,
);

const errorSelector = createSelector(
  (state: State) => state.auth,
  auth => auth.error,
);

const Auth = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const [isSignIn, setIsSignIn] = React.useState(true);
  const [authForm, setAuthForm] = React.useState(initialForm);

  const loginHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch({
      type: LOGIN_START,
      email: authForm.email.value,
      password: authForm.password.value,
      isSignIn: isSignIn,
    });
    setAuthForm({ ...initialForm });
  };

  const logoutHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch({ type: LOGOUT });
  };

  const signInSignUPHandler = () => setIsSignIn(prev => !prev);

  const inputChangeHandler = (event: { target: HTMLInputElement }) => {
    const [input] = Object.values(authForm).filter(input => input.elementConfig.type === event.target.id);
    const updatedInput = {
      ...input,
      value: event.target.value,
      touched: true,
      valid: checkValidity(event.target.value, input.validation),
    };
    setAuthForm(prev => {
      return {
        ...prev,
        [event.target.id]: updatedInput,
      };
    });
  };
  const number: string = 35;

  const inputs = Object.values(authForm).map(input => (
    <Input
      key={input.elementConfig.type}
      id={input.elementConfig.type}
      value={input.value}
      label={input.elementConfig.label}
      onChange={inputChangeHandler}
      error={!input.valid && input.touched ? 1 : 0}
    />
  ));

  const formIsValid = authForm.email.valid && authForm.password.valid;
  let authContent = (
    <form className={styles.form}>
      {error && (
        <p className={styles.SwitchSign} style={{ color: 'red' }}>
          {error}
        </p>
      )}
      {inputs}
      <div>
        <button onClick={loginHandler} disabled={!formIsValid}>
          LOGGIN
        </button>
        <button onClick={logoutHandler}>CANCEL</button>
        <p onClick={signInSignUPHandler} className={styles.SwitchSign}>
          Switch to {isSignIn ? 'Sign Up' : 'Sign In'}
        </p>
      </div>
    </form>
  );

  if (isLoading) authContent = <Spinner />;

  return authContent;
};

export default Auth;
