import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendMessage, getConversationData } from '../actions/conversation';

class MainChat extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    getConversationData: PropTypes.func.isRequired,
    conversation: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => {
    this.props.getConversationData();
  }

  render = () => {
    const { Layout, conversation, onFormSubmit, isLoading, infoMessage, errorMessage, successMessage } = this.props;

    return <Layout conversation={conversation}
                   onFormSubmit={onFormSubmit}
                   loading={isLoading}
                   info={infoMessage}
                   error={errorMessage}
                   success={successMessage} />;
  }
}

const mapStateToProps = state => ({
  conversation: state.conversation || {},
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onFormSubmit: sendMessage,
  getConversationData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainChat);
