import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import withPrefetchData from '../withPrefetchData';

const App = (props) => {
  return (
    <div>
      <div className="ui fixed inverted menu">
        <h1 className="header item">All Things Westies</h1>
        <Link to="/products" className="item">Products</Link>
        <Link to="/cart" className="item">Cart</Link>
      </div>
      <div className="ui main text container">
        {
          renderRoutes(
            props.route.routes,
            { history: props.history }
          )
        }
      </div>
    </div>
  );
};

App.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      component: PropTypes.func
    }))
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}

export default connect()(withPrefetchData(App));
