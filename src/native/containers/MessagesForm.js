import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { sendMessage, updateMessage } from '../../actions/conversation'
import MessageFormComponent from './components/MessagesForm'

const MessageForm = (props) => {

  const { member,
          message,
          sending,
          sendMessage,
          updateMessage,
          sendingError,
          onSendMessage
        } = props;

  return <MessageFormComponent
            member={member}
            message={message}
            sending={sending}
            sendMessage={sendMessage}
            updateMessage={updateMessage}
            sendingError={sendingError}
            onSendMessage={onSendMessage}
            />
}


const mapStateToProps = state => ({
  message: state.conversation.message || '',
  sending: state.conversation.sending || false,
  sendingError: state.conversation.sendingError,
})

const mapDispatchToProps = {
  sendMessage: sendMessage,
  updateMessage: updateMessage,
}

MessageForm.propTypes = {
  sending: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  sendingError: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
