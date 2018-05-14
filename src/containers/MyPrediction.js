import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoadingFalse } from '../actions/member';


const MyPrediction = ({
  Layout,
  errorMessage,
  
  member
}) => (
  <Layout
    error={errorMessage}
    getPredictionValues={getPredictionValues}
    member={member}
    incomePredictionValues={incomePredictionValues}
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
  incomePredictionValues:state.prediction.incomePredictionValues || []
});

const mapDispatchToProps = {
  getPredictionValues:getPredictionValues
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPrediction);
