import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessageRowComponent from './components/MessageRow';

class MessageRow extends Component {
  render() {
    return (
      <MessageRowComponent
        message={this.props.message}
      />
    );
  }
}

MessageRow.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageRow;
