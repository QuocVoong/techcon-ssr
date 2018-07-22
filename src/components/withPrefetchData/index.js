import React from 'react';
import asyncMatchRoutes from '../../shared/helpers/asyncMatchRoutes';
import { find } from 'lodash';

const withPrefetchData = (WrappedComponent) => {
  return class extends React.PureComponent {
    fetchData = async (nextProps) => {
      const { route, location } = nextProps;
      const { routes } = route;
      const { component } = await asyncMatchRoutes(routes, location.pathname);
      let actions = [];
      if (component) {
        if (component.displayName && component.displayName.toLowerCase().indexOf('connect') > -1) {
          let parentComponent = component.WrappedComponent;
          if (parentComponent.prefetchActions) {
            actions.push(parentComponent.prefetchActions(location.pathname.substring(1)));
          } else if (parentComponent.wrappedComponent && parentComponent.wrappedComponent().prefetchActions) {
            actions.push(parentComponent.wrappedComponent().prefetchActions(location.pathname.substring(1)));
          }
        } else if (component.prefetchActions) {
          actions.push(component.prefetchActions(location.pathname.substring(1)));
        }
      }
      actions = actions.reduce((flat, toFlatten) => {
        return flat.concat(toFlatten);
      }, []);
      const promises = actions.map((initialAction) => {
        return this.props.dispatch(initialAction());
      });
      Promise.all(promises);
    }

    componentWillMount() {
      this.fetchData(this.props);
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
