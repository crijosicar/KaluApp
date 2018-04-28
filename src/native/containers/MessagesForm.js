import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { sendMessage, updateMessage } from '../../actions/conversation'
import MessageFormComponent from './components/MessagesForm'

const MessageForm = (props) => {
  const { member,
          sending,
          toSendMessage,
          toUpdateMessage,
          message,
          sendingError
        } = props;

  return <MessageFormComponent
            member={member}
            sending={sending}
            sendMessage={sendMessage}
            updateMessage={updateMessage}
            message={message}
            sendingError={sendingError} />
}


const mapStateToProps = state => ({
  sending: state.conversation.sending || false,
  sendingError: state.conversation.sendingError,
  message: state.conversation.message,
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
