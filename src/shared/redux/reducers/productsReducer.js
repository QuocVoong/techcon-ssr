import { GET_PRODUCTS } from '../actionTypes';

export default function products(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        items: action.data
      };
    case `${GET_PRODUCTS}_ERROR`:
      return {
        ...state
      };
    default:
      return state;
  }
}
