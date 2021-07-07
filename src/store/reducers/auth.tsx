import { OPEN_LOGIN_FORM, LOGIN_START, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from '../actionsTypes';

const initialState = {
  userId: '',
  token: '',
  error: '',
  loading: false,
  formIsShown: false,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_LOGIN_FORM:
      return {
        ...state,
        formIsShown: true,
      };
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        loading: false,
        error: '',
        formIsShown: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        userId: '',
        token: '',
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
