import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes, renderRoutes } from 'react-router-config';
import createMemoryHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Loadable from 'react-loadable';
import routes from '../../shared/routes';
import initReduxStore from '../../shared/redux/index';
import Template from './template';
import { getBundles } from 'react-loadable/webpack'
import stats from '../../../dist/react-loadable.json';
import asyncMatchRoutes from '../../shared/helpers/asyncMatchRoutes';

export default async function renderView(req, res, next) {
  const { match, component } = await asyncMatchRoutes(routes, req.path);
  const context = {};
  let modules = [];
  if (match) {
  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });
    const store = initReduxStore(history);

    let actions = [];
    if (component) {
      if (component.displayName &&
        component.displayName.toLowerCase().indexOf('connect') > -1
      ) {
        let parentComponent = component.WrappedComponent;
        if (parentComponent.prefetchActions) {
          actions.push(parentComponent.prefetchActions());
        } else if (parentComponent.wrappedComponent && parentComponent.wrappedComponent().prefetchActions) {
          actions.push(parentComponent.wrappedComponent().prefetchActions());
        }
      } else if (component.prefetchActions) {
        actions.push(component.prefetchActions());
      }
    }
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
          <ConnectedRouter context={context} history={history}>
            <Loadable.Capture report={moduleName => modules.push(moduleName)}>
              <StaticRouter location={req.url} context={context}>
                { renderRoutes(routes) }
              </StaticRouter>
            </Loadable.Capture>
          </ConnectedRouter>
        </Provider>
      );

      if (context.notFound) {
        res.status(404);
      }

      let bundles = getBundles(stats, modules);

      const bundlesString = bundles.map(bundle => {
        return `<script src="${bundle.file}"></script>`
      }).join('\n');

      if (!context.url) {
        const document = renderToString(
          <Template
            renderedToStringComponents={app}
            serverState={stringifiedServerState}
            bundlesString={bundlesString}
          />
        );
        res.send(`<!DOCTYPE html>${document}`);
      } else {
      return res.redirect(301, context.url);
      }
    });
  } else {
    next();
  }
}
