import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {
  render() {
    const Component = this.props.component;
    return this.props.isLoggedIn ? (
      <Component />
    ) : (
      <Redirect to={{ pathname: '/' }} />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

export default connect(mapStateToProps)(ProtectedRoute);
