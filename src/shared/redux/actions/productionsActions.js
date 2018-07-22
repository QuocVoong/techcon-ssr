import fetch from 'isomorphic-fetch';
import { GET_PRODUCTS } from '../actionTypes';

export function getProducts() {
  return (dispatch) => {
    return fetch('http://localhost:8080/api/products', {
      method: 'GET',
    }).then((response) => {
      return response.json().then((data) => {
        return dispatch({
          type: GET_PRODUCTS,
          data: [data],
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
