import { TOGGLE_UI_CARD } from '../actionsTypes';

const initialState = {
  uiCardIsVisible: false,
};

export const uiReducer = (state = initialState, action: any): { uiCardIsVisible: boolean } => {
  switch (action.type) {
    case TOGGLE_UI_CARD:
      return {
        uiCardIsVisible: !state.uiCardIsVisible,
      };
    default:
      return state;
  }
};
