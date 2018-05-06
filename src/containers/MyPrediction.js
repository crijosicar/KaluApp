import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoadingFalse } from '../actions/member';
import { getPieValues } from '../actions/wallet';

const MyPrediction = ({
  Layout,
  errorMessage,
  
  member
}) => (
  <Layout
    error={errorMessage}
    
    member={member}
  />
);

MyPrediction.propTypes = {
  errorMessage: PropTypes.string,
};

MyPrediction.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({
  member:state.member||{},
  errorMessage: state.status.error || null,
  
});

const mapDispatchToProps = {
 
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPrediction);
