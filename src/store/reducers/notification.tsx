import { PENDING_NOTIFICATION, SUCCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../actionsTypes';

const initialState = { status: '', title: '', message: '' };

export const notificationReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case PENDING_NOTIFICATION:
      return {
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      };
    case SUCCCESS_NOTIFICATION:
      return {
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!',
      };
    case ERROR_NOTIFICATION:
      return {
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!',
      };
    default:
      return state;
  }
};
