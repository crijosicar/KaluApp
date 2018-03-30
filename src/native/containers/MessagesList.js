import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { loadMessages } from '../../actions/conversation'
import { getChatItems } from '../../store/selectors'

import MessageListComponent from './components/MessagesList'

class MessagesList extends Component {

  componentDidMount() {
    this.props.loadMessages();
  }

  render() {
    console.log(this.props);
    const data = getChatItems(this.props.messages).reverse();
    return (
      <MessageListComponent data={data} />
    )
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
  error: state.loadMessagesError
})

const mapDispatchToProps = {
  loadMessages
}

MessagesList.propTypes = {
  messages: PropTypes.object,
  error: PropTypes.string,
  loadMessages: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)
