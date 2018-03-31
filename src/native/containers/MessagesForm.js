import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { sendMessage, updateMessage } from '../../actions/conversation'

import MessageFormComponent from './components/MessagesForm'

const MessageForm = props => {
  return <MessageFormComponent
          sending={props.sending}
          sendMessage={props.sendMessage}
          updateMessage={props.updateMessage}
          message={props.message}
          sendingError={props.sendingError} />
}


const mapStateToProps = state => ({
  sending: state.conversation.sending,
  sendingError: state.conversation.sendingError,
  message: state.conversation.message,
})

const mapDispatchToProps = {
  sendMessage,
  updateMessage,
}

MessageForm.propTypes = {
  sending: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  sendingError: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
