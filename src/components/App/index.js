import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import withPrefetchData from '../withPrefetchData';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Icon } from 'react-icons-kit';
import { home } from 'react-icons-kit/icomoon/home';
import { ic_library_books } from 'react-icons-kit/md/ic_library_books';
import { cart } from 'react-icons-kit/icomoon/cart';
import { ic_settings } from 'react-icons-kit/md/ic_settings';
import { bell } from 'react-icons-kit/iconic/bell';
import { user } from 'react-icons-kit/metrize/user';


const App = (props) => {
  return (
    <div>
      <div className="ui fixed inverted menu massive grid">
        <div className="three wide column" style={{ marginLeft: '64px' }}>
          <span className="header vertically fitted item">My Website</span>
        </div>
        <div className="ten wide column">
          <div className="ui grid">
            <Link to="/products" className="item">Products</Link>
            <Link to="/cart" className="item">Cart</Link>
          </div>
        </div>
        <div className="three wide column">
          <div className="ui grid">
            <Icon className="item" size={22} style={{ color: 'yellow' }} icon={bell} />
            <Icon className="item" size={24} icon={user} />
          </div>
        </div>
      </div>
      <div>
        <SideNav
          onSelect={(selected) => {
            props.history.push(selected);
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="products">
              <NavIcon style={{ fontSize: '1.75em' }} >
                <Icon size={20} style={{ color: '#2A9D8F' }} icon={home} />
              </NavIcon>
              <NavText>
                Home
              </NavText>
            </NavItem>
            <NavItem eventKey="products">
              <NavIcon style={{ fontSize: '1.75em' }} >
                <Icon size={20} style={{ color: '#F4A261' }} icon={ic_library_books} />
              </NavIcon>
              <NavText>
                Products
              </NavText>
            </NavItem>
            <NavItem eventKey="cart">
              <NavIcon style={{ fontSize: '1.75em' }} >
                <Icon size={20} style={{ color: '#E9C46A' }} icon={cart} />
              </NavIcon>
              <NavText>
                Cart
              </NavText>
            </NavItem>
            <NavItem eventKey="settings">
              <NavIcon style={{ fontSize: '1.75em' }} >
                <Icon size={20} icon={ic_settings} />
              </NavIcon>
              <NavText>
                Settings
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>

      <div>
        <div className="ui main text container">
          {
            renderRoutes(
              props.route.routes,
              { history: props.history }
            )
          }
        </div>
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
