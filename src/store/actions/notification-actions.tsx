import { PENDING_NOTIFICATION, SUCCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../actionsTypes';

interface type {
  type: string;
}

export const pendigNotification = (): type => {
  return {
    type: PENDING_NOTIFICATION,
  };
};

export const successNotification = (): type => {
  return {
    type: SUCCCESS_NOTIFICATION,
  };
};

export const errorNotification = (): type => {
  return {
    type: ERROR_NOTIFICATION,
  };
};
