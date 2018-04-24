import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessageRowComponent from './components/MessageRow';

class MessageRow extends Component {
  render() {
    const isCurrentUser =  this.props.message.isBot;
    return (
      <MessageRowComponent
        message={this.props.message}
        isCurrentUser={isCurrentUser}/>
    );
  }
}

MessageRow.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageRow;
