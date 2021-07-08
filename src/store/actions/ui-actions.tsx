import { TOGGLE_UI_CARD } from '../actionsTypes';

export const toogleUiCard = (): { type: string } => {
  return {
    type: TOGGLE_UI_CARD,
  };
};
