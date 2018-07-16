import { GET_CART_ITEMS } from '../actionTypes';

export default function cart(state = {}, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {
        ...state,
        items: action.data
      };
    case `${GET_CART_ITEMS}_ERROR`:
      return state;
    default:
      return state;
  }
}
