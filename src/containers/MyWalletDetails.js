import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoadingFalse } from '../actions/member';
import { getWalletDetailsValues } from '../actions/wallet';

const MyWalletDetails = ({
  Layout,
  errorMessage,
  incomeDetailsValues,
  incomeDetailsLabels,
  expenseDetailsValues,
  expenseDetailsLabels,
  getWalletDetailsValues,
  member
}) => (
  <Layout
    error={errorMessage}
    incomeDetailsValues={incomeDetailsValues}
    incomeDetailsLabels={incomeDetailsLabels}
    expenseDetailsValues={expenseDetailsValues}
    expenseDetailsLabels={expenseDetailsLabels}
    getWalletDetailsValues={getWalletDetailsValues}
    member={member}
  />
);

MyWalletDetails.propTypes = {
  errorMessage: PropTypes.string,
};

MyWalletDetails.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({
  member:state.member||{},
  errorMessage: state.status.error || null,
  incomeDetailsValues: state.wallet.incomeDetailsValues || [],
  incomeDetailsLabels: state.wallet.incomeDetailsLabels || [],
  expenseDetailsValues: state.wallet.expenseDetailsValues || [],
  expenseDetailsLabels:  state.wallet.expenseDetailsLabels || [],
});

const mapDispatchToProps = {
  getWalletDetailsValues: getWalletDetailsValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyWalletDetails);
