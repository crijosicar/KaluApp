import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login, registerWithFacebook } from '../actions/member';

class Login extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    isLoading: PropTypes.bool.isRequired,
    infoMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
  }

  componentDidMount = () => {};

  render = () => {
    const { Layout,
            member,
            onLogin,
            isLoading,
            infoMessage,
            errorMessage,
            successMessage,
            onFacebookRegister } = this.props;
    
    return <Layout  onLogin={onLogin}
                    member={member}
                    loading={isLoading}
                    info={infoMessage}
                    error={errorMessage}
                    success={successMessage}
                    onFacebookRegister={onFacebookRegister}/>;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onLogin: login,
  onFacebookRegister: registerWithFacebook
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
