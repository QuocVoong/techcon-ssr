import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import AppContainer from '../components/App';
import routes from '../shared/routes';
import initRedux from '../shared/redux';
import Html from '../shared/helpers/Html';


export default function renderView(req, res, next) {
  const matches = matchRoutes(routes, req.path);
  const context = {}

  if (matches) {
  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });
    const store = initRedux(history);

    let actions = [];
    matches.map(({match, route}) => {
      const component = route.component;
      if (component) {
        if (component.displayName &&
            component.displayName.toLowerCase().indexOf('connect') > -1
        ) {
          let parentComponent = component.WrappedComponent
          if (parentComponent.prefetchActions) {
            actions.push(parentComponent.prefetchActions());
          } else if (parentComponent.wrappedComponent && parentComponent.wrappedComponent().prefetchActions) {
            actions.push(parentComponent.wrappedComponent().prefetchActions());
          }
        } else if (component.prefetchActions) {
          actions.push(component.prefetchActions());
        }
      }
    });

    actions = actions.reduce((flat, toFlatten) => {
      return flat.concat(toFlatten);
    }, []);

    const promises = actions.map((initialAction) => {
      return store.dispatch(initialAction());
    });

    Promise.all(promises).then(() => {
      const serverState = store.getState();
      const stringifiedServerState = JSON.stringify(serverState);
      const app = renderToString(
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <StaticRouter location={req.url} context={context}>
              { renderRoutes(routes) }
            </StaticRouter>
          </ConnectedRouter>
        </Provider>
      );

      if (context.notFound) {
        res.status(404);
      }

      if (!context.url) {
        const html = renderToString(
          <Html
            renderedToStringComponents={app}
            serverState={stringifiedServerState}
          />
        );
        res.send(`<!DOCTYPE html>${html}`);
      } else {
      return res.redirect(301, context.url);
      }


    });
  } else {
    next();
  }
}