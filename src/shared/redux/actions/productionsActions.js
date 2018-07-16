import { fetch, Headers } from 'isomorphic-fetch';
import { GET_PRODUCTS } from '../actionTypes';

export function getProducts() {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  return (dispatch) => {
    return fetch('http://localhost:3000/api/products', {
      method: 'GET',
      headers
    }).then((response) => {
      return response.json().then((data) => {
        return dispatch({
          type: GET_PRODUCTS,
          notifications: data
        });
      });
    }).catch(() => {
      return dispatch({ type: `${GET_PRODUCTS}_ERROR` });
    });
  };
}

export default {
  getProducts,
};
