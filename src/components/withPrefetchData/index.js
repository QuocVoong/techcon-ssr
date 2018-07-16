import React from 'react';
import { matchRoutes } from 'react-router-config';

const withPrefetchData = (WrappedComponent) => {
  return class extends React.PureComponent {
    fetchData(nextProps) {
      const { route, location } = nextProps;
      const { routes } = route;
      const matches = matchRoutes(routes, location.pathname);
      const results = matches.map(({match, route}) => {
        const component = route.component;
        if (component) {
          if (component.displayName && component.displayName.toLowerCase().indexOf('connect') > -1) {
            let parentComponent = component.WrappedComponent
            if (parentComponent.prefetchActions) {
              return parentComponent.prefetchActions(location.pathname.substring(1));
            } else if (parentComponent.wrappedComponent && parentComponent.wrappedComponent().prefetchActions) {
              return parentComponent.wrappedComponent().prefetchActions(location.pathname.substring(1));
            }
          } else if (component.prefetchActions) {
            return component.prefetchActions(location.pathname.substring(1))
          }
        }
        return [];
      });

      const actions = results.reduce((flat, toFlatten) => {
        return flat.concat(toFlatten);
      }, []);

      const promises = actions.map((initialAction) => {
        return this.props.dispatch(initialAction());
      });
      Promise.all(promises);
    }

    componentWillReceiveProps(nextProps) {
      this.fetchData(nextProps);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}

export default withPrefetchData;
