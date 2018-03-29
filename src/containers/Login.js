import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../actions/member';

class Login extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
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
            onFormSubmit,
            isLoading,
            infoMessage,
            errorMessage,
            successMessage } = this.props;

    return <Layout  onFormSubmit={onFormSubmit}
                    member={member}
                    loading={isLoading}
                    info={infoMessage}
                    error={errorMessage}
                    success={successMessage}/>;
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
  onFormSubmit: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
