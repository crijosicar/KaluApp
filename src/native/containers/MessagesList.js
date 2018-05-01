import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getChatItems } from '../../store/selectors'

import MessageListComponent from './components/MessagesList'

class MessagesList extends Component {

  render() {
    let data = [];
    if(this.props.messages !== null){
       data = getChatItems(this.props.messages.items);
    }
    return (
      <MessageListComponent data={data}/>
    );
  }

}

const mapStateToProps = state => ({
  messages: state.conversation.messages,
  error: state.conversation.loadMessagesError
})

const mapDispatchToProps = state => ({})

MessagesList.propTypes = {
  error: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)
