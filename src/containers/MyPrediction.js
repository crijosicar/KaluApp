import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoadingFalse } from '../actions/member';
import {getPredictionValues, getPredictionTimeframe} from '../actions/prediction';

const MyPrediction = ({
  Layout,
  errorMessage,
  getPredictionValues,
  getPredictionTimeframe,
  incomePredictionValues,
  expensePredictionValues,
  expensePredictionTimeFrame,
  member
}) => (
  <Layout
    error={errorMessage}
    getPredictionValues={getPredictionValues}
    getPredictionTimeframe={getPredictionTimeframe}
    member={member}
    incomePredictionValues={incomePredictionValues}
    expensePredictionValues={expensePredictionValues}
    expensePredictionTimeFrame={expensePredictionTimeFrame}
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
  expensePredictionValues:state.prediction.expensePredictionValues || null,
  expensePredictionTimeFrame:state.prediction.expensePredictionTimeFrame || null
});

const mapDispatchToProps = {
  getPredictionValues:getPredictionValues,
  getPredictionTimeframe:getPredictionTimeframe
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPrediction);
