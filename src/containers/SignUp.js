import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signUp, login, userDataReset, setLoadingFalse } from '../actions/member';

const SignUp = ({
  Layout,
  onSignUp,
  onLogIn,
  onUserResetData,
  setLoadingFalse,
  member,
  isLoading,
  infoMessage,
  errorMessage,
  successMessage,
}) => (
  <Layout
    member={member}
    loading={isLoading}
    info={infoMessage}
    error={errorMessage}
    success={successMessage}
    onSignUp={onSignUp}
    onLogIn={onLogIn}
    onUserResetData={onUserResetData}
    setLoadingFalse={setLoadingFalse}
  />
);

SignUp.propTypes = {
  Layout: PropTypes.func.isRequired,
  member: PropTypes.shape({}).isRequired,
  onSignUp: PropTypes.func.isRequired,
  onLogIn: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

SignUp.defaultProps = {
  infoMessage: null,
  errorMessage: null,
  successMessage: null,
};

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onSignUp: signUp,
  onLogIn: login,
  onUserResetData: userDataReset,
  setLoadingFalse: setLoadingFalse
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
