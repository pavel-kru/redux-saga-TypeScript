import { ADD_ITEM, REMOVE_ITEM, REPLACE_CART } from '../actionsTypes';

interface Item {
  id: string;
  quantity: number;
  totalAmount: number;
  price: number;
  userId: ''
}

const initialState = { items: [], totalQuantity: 0, changed: false };

export const cartReducer = (state = initialState, action: any) => {
  let updateTotalQuantity: number;
  let existingCartItemIndex: number;
  let updatedItems: Item[] = [];
  let existingItem: Item;

  switch (action.type) {
    case REPLACE_CART:
      return {
        ...state,
        items: action.payload.items || [],
        totalQuantity: action.payload.totalQuantity,
      };
    case ADD_ITEM:
      updateTotalQuantity = state.totalQuantity + 1;

      existingCartItemIndex = state.items.findIndex((item: Item) => item.id === action.item.id);

      existingItem = state.items[existingCartItemIndex];

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: ++existingItem.quantity,
          totalAmount: existingItem.totalAmount + existingItem.price,
          userId: action.userId
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        ...state,
        items: updatedItems,
        totalQuantity: updateTotalQuantity,
        changed: true,
      };

    case REMOVE_ITEM:
      updateTotalQuantity = state.totalQuantity - 1;
      existingCartItemIndex = state.items.findIndex((item: Item) => item.id === action.id);
      existingItem = state.items[existingCartItemIndex];

      if (existingItem && existingItem.quantity === 1) {
        updatedItems = state.items.filter((item: Item) => item.id !== action.id);
      }

      if (existingItem && existingItem.quantity > 1) {
        const updatedItem = {
          ...existingItem,
          quantity: --existingItem.quantity,
          totalAmount: existingItem.totalAmount - existingItem.price,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        ...state,
        items: updatedItems,
        totalQuantity: updateTotalQuantity,
        changed: true,
      };
    default:
      return state;
  }
};
