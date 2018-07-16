import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import createBrowserHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
// import Loadable from 'react-loadable';
import AppContainer from './components/App';
import routes from './shared/routes';
import initRedux from './shared/redux';

const initialState = JSON.parse(window.__SERIALIZED_STATE__);

const history = createBrowserHistory();
const store = initRedux(history, initialState);

 		ReactDOM.render(
 		  <Provider store={store}>
 		  	<ConnectedRouter history={history}>
					{ renderRoutes(routes) }
 		    </ConnectedRouter>
 		  </Provider>,
 		  document.getElementById('root')
 		);