import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setLoadingFalse } from '../actions/member';

const MiCartera = ({
  Layout,
  //onFormSubmit,
  //member,
  //isLoading,
  errorMessage,
  //onStartView,
}) => (
  <Layout
    //member={member}
    loading={isLoading}
    error={errorMessage}
    //onFormSubmit={onFormSubmit}
    //onStartView={onStartView}
  />
);

MiCartera.propTypes = {
  //Layout: PropTypes.func.isRequired,
  //member: PropTypes.shape({}).isRequired,
  //onFormSubmit: PropTypes.func.isRequired,
  //onStartView: PropTypes.func.isRequired,
  //isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

MiCartera.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({
  //member: state.member || {},
  //isLoading: state.status.loading || false,
  //infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  //successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onStartView: setLoadingFalse,
  onFormSubmit: resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(MiCartera);
