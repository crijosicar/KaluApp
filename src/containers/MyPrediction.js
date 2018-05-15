import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoadingFalse } from '../actions/member';
import {getPredictionValues} from '../actions/prediction';

const MyPrediction = ({
  Layout,
  errorMessage,
  getPredictionValues,
  incomePredictionValues,
  expensePredictionValues,
  member
}) => (
  <Layout
    error={errorMessage}
    getPredictionValues={getPredictionValues}
    member={member}
    incomePredictionValues={incomePredictionValues}
    expensePredictionValues={expensePredictionValues}
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
  incomePredictionValues:state.prediction.incomePredictionValues || null,
  expensePredictionValues:state.prediction.expensePredictionValues || null
});

const mapDispatchToProps = {
  getPredictionValues:getPredictionValues
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPrediction);
