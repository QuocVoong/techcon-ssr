import fetch from 'isomorphic-fetch';
import { GET_CART_ITEMS } from '../actionTypes';

export function getCartItems() {
  return (dispatch) => {
    return fetch('http://localhost:8080/api/user/cart', {
      method: 'GET'
    }).then((response) => {
      return response.json().then((data) => {
        return dispatch({
          type: GET_CART_ITEMS,
          data: data.items
        });
      });
    }).catch((err) => {
      console.log('err: ', err)
      return dispatch({ type: `${GET_CART_ITEMS}_ERROR` });
    });
  };
}

export default {
  getCartItems,
};
