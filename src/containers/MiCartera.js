import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoadingFalse } from '../actions/member';
import { getIncomeCategories,getIncomeValues,getExpensesCategories,getExpensesValues } from '../actions/wallet';

const MyWallet = ({
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
  onPieValues: getPieValues,
  
};

export default connect(mapStateToProps, mapDispatchToProps)(MyWallet);
