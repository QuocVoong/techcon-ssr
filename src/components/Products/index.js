import React from 'react';
import { productionActions } from '../../shared/redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showToolTip: false,
      searchQuery: ''
    };
    this.updateSearchQuery = this.updateSearchQuery.bind(this);
  }

  static prefetchActions() {
    return [
      productionActions.getProducts
    ];
  }

  componentDidMount() {
    this.clearTimer = setTimeout(() => {
      this.setState({
        showToolTip: true
      });
    }, 10000);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.searchQuery.length > 0) {
      clearTimeout(this.clearTimer);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.clearTimer);
  }

  updateSearchQuery() {
    this.setState({
      searchQuery: this.search.value
    });
  }

  render() {
    const toolTip = (
      <div className="tooltip ui inverted">
        Not sure where to start? Try top Picks.
      </div>
    );
    return (
      <div className="products">
        <div className="ui search">
          <div className="ui item input">
            <input
              className="prompt"
              type="text"
              value={this.state.searchQuery}
              ref={(input) => { this.search = input; }}
              onChange={this.updateSearchQuery}
            />
            <i className="search icon" />
          </div>
          <div className="results" />
        </div>
        <h1 className="ui dividing header">Shop by Category</h1>
        <div className="ui doubling four column grid">
          <div className="column segment secondary">
            <i className="coffee icon" />
            <div className="category-title">Gifts</div>
          </div>
          <div className="column segment secondary">
            <i className="food icon" />
            <div className="category-title">Treats and Food</div>
          </div>
          <div className="column segment secondary">
            <i className="heart icon" />
            <div className="category-title">Top Picks</div>
            { this.state.showToolTip ? toolTip : ''}
          </div>
          <div className="column segment secondary">
            <i className="paw icon" />
            <div className="category-title">For Dogs</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: bindActionCreators([productionActions.getProducts], dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
