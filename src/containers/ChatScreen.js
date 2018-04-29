import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { sendMessage, loadMessages } from '../actions/conversation';

class ChatScreen extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    loadMessages: PropTypes.func.isRequired,
    conversation: PropTypes.shape({}).isRequired,
    isLoading: PropTypes.bool.isRequired,
    infoMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    sending: PropTypes.bool.isRequired,
  }

  render = () => {
    const { Layout,
            conversation,
            member,
            onFormSubmit,
            isLoading,
            infoMessage,
            errorMessage,
            successMessage,
            loadMessages,
            sending
          } = this.props;

    return <Layout  conversation={conversation}
                    member={member}
                    onFormSubmit={onFormSubmit}
                    loading={isLoading}
                    info={infoMessage}
                    error={errorMessage}
                    success={successMessage}
                    loadMessages={loadMessages}
                    sending={sending} />;
  }
}

const mapStateToProps = state => ({
  sending: state.conversation.sending || false,
  conversation: state.conversation || {},
  member: state.member || {},
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {
  onFormSubmit: sendMessage,
  loadMessages: loadMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
