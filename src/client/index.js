import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import routes from '../shared/routes';
import initReduxStore from '../shared/redux';

const initialState = JSON.parse(window.__SERIALIZED_STATE__);
const history = createBrowserHistory();
const store = initReduxStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { renderRoutes(routes) }
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
