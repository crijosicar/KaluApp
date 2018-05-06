import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MiCartera = ({
  Layout,
  errorMessage,
}) => (
  <Layout
    error={errorMessage}
  />
);

MiCartera.propTypes = {
  errorMessage: PropTypes.string,
};

MiCartera.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({
  errorMessage: state.status.error || null,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MiCartera);
