import { PENDING_NOTIFICATION, SUCCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../actionsTypes';

export const pendigNotification = () => {
  return {
    type: PENDING_NOTIFICATION,
  };
};

export const successNotification = () => {
  return {
    type: SUCCCESS_NOTIFICATION,
  };
};

export const errorNotification = () => {
  return {
    type: ERROR_NOTIFICATION,
  };
};
