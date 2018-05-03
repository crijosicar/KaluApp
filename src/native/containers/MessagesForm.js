import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { sendMessage, updateMessage, sendMessageAsAudio, uploadAudio } from '../../actions/conversation'
import MessageFormComponent from './components/MessagesForm'

const MessageForm = (props) => {

  const { member,
          message,
          sending,
          sendMessage,
          updateMessage,
          sendingError,
          onSendMessage,
          onSendMessageAsAudio,
          uploadAudio,
          audionName,
          watsonResponse
        } = props;

  return <MessageFormComponent
            member={member}
            message={message}
            sending={sending}
            audionName={audionName}
            sendMessage={sendMessage}
            updateMessage={updateMessage}
            sendingError={sendingError}
            onSendMessage={onSendMessage}
            onSendMessageAsAudio={onSendMessageAsAudio}
            uploadAudio={uploadAudio}
            watsonResponse={watsonResponse}
            />
}


const mapStateToProps = state => ({
  watsonResponse: state.conversation.watsonResponse || '',
  audionName: state.conversation.audionName || '',
  message: state.conversation.message || '',
  sending: state.conversation.sending || false,
  sendingError: state.conversation.sendingError,
})

const mapDispatchToProps = {
  sendMessage: sendMessage,
  updateMessage: updateMessage,
  onSendMessageAsAudio: sendMessageAsAudio,
  uploadAudio: uploadAudio
}

MessageForm.propTypes = {
  sending: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  sendingError: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
