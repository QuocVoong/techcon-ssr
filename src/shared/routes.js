import Loadable from 'react-loadable';
import App from '../components/App';
import Products from '../components/Products';
import Cart from '../components/Cart';
import NotFound from '../components/NotFound';

// const ProductsLoadable = Loadable({
//   loader: () => require('../components/Products'),
//   loading: () => <div>Loading</div>
// });

// const CartLoadable = Loadable({
//   loader: () => require('../components/Cart'),
//   loading: () => <div>Loading!</div>
// });

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Products
      },
      {
        path: '/products',
        component: Products
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        ...NotFound
      },
    ]
  }
]

export default routes;
