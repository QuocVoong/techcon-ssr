import React from 'react';
import Loadable from 'react-loadable';
import App from '../components/App';
import NotFound from '../components/NotFound';

const ProductsLoadable = Loadable({
  loader: () => import("../components/Products" /* webpackChunkName: "products" */),
  loading: () => <div>Loading!</div>
});

const CartLoadable = Loadable({
  loader: () => import("../components/Cart" /* webpackChunkName: "cart" */),
  loading: () => <div>Loading!</div>
});

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: ProductsLoadable
      },
      {
        path: '/products',
        component: ProductsLoadable
      },
      {
        path: '/cart',
        component: CartLoadable
      },
      {
        ...NotFound
      },
    ]
  }
]

export default routes;
