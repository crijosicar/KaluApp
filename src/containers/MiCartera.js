import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setLoadingFalse } from '../actions/member';

const MiCartera = ({
  Layout,
 
  errorMessage,
 
}) => (
  <Layout
  
    error={errorMessage}
  
  />
);

MiCartera.propTypes = {
 
  onStartView: PropTypes.func.isRequired,

  errorMessage: PropTypes.string,
};

MiCartera.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({

  errorMessage: state.status.error || null,

});

const mapDispatchToProps = {
  onStartView: setLoadingFalse,
  
};

export default connect(mapStateToProps, mapDispatchToProps)(MiCartera);
