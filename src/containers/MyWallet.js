import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoadingFalse } from '../actions/member';
import { getPieValues } from '../actions/wallet';

const MyWallet = ({
  Layout,
  errorMessage,
  incomeValues,
  incomeLabels,
  expenseValues,
  expenseLabels,
  getPieValues,
  member
}) => (
  <Layout
    error={errorMessage}
    incomeValues={incomeValues}
    incomeLabels={incomeLabels}
    expenseValues={expenseValues}
    expenseLabels={expenseLabels}
    getPieValues={getPieValues}
    member={member}
  />
);

MyWallet.propTypes = {
  errorMessage: PropTypes.string,
};

MyWallet.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({
  member:state.member||{},
  errorMessage: state.status.error || null,
  incomeValues: state.wallet.incomeValues || [],
  incomeLabels: state.wallet.incomeLabels || [],
  expenseValues: state.wallet.expenseValues || [],
  expenseLabels:  state.wallet.expenseLabels || [],
});

const mapDispatchToProps = {
  getPieValues: getPieValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyWallet);
