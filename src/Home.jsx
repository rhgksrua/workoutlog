import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authUserFetch } from './actions/userActions';

import Header from './components/header/Header';
import './Home.css';

class Home extends Component {
  componentDidMount() {
    // check for permission and username
    // if username and token exists
    this.props.authUser();
  }
  permission() {
  }
  render() {
    return (
      <div className="section home-container">
        <Header />
      </div>
    );
  }
};

Home.propTypes = {
  username: PropTypes.string
}

const mapStateToProps = (state, props) => {
  const { user: { username } } = state;
  return { username };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authUser: function(currentPath) {
      dispatch(authUserFetch(currentPath));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
