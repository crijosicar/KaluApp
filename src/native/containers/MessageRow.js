import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessageRowComponent from './components/MessageRow';

class MessageRow extends Component {
  render() {
    const isCurrentUser = 'email@mail.com' == this.props.message.user.email;
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
