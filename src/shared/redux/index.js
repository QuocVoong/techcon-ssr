import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import { routerReducer as router, routerMiddleware, navigation } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk';
// import loggerMiddleware from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { reducers } from './reducers';

export default function (history, initialStore = {}) {
  let composeEnhancers;
  if (typeof window !== 'undefined') {
    composeEnhancers = composeWithDevTools({});
  }
  composeEnhancers = composeEnhancers || compose;

  const routeMiddleware = routerMiddleware(history);
  const middleware = [thunkMiddleware, routeMiddleware];
  const enhancers = applyMiddleware(...middleware);

  return composeEnhancers(
      applyMiddleware(...middleware)
    )(createStore)(combineReducers({...reducers, router}), initialStore);
}
