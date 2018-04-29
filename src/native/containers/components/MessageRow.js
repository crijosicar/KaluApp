import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import relativeDate from 'relative-date'
import moment from 'moment'
import 'moment/locale/es'

const MESSAGE_TEXT_MARGIN = 50;

const MessageRowComponent = props => {
  const isCurrentUser = props.message.isBot === 0;
  const alignItems = isCurrentUser ? 'flex-end' : 'flex-start';
  const margin = isCurrentUser ? {marginLeft: MESSAGE_TEXT_MARGIN} : {marginRight: MESSAGE_TEXT_MARGIN};
  const username = isCurrentUser ? 'tu' : props.message.user.email;
  moment.locale('es');
  const date = moment(new Date(props.message.createdAt)).fromNow();

  return (
    <View
      style={styles.container}>
      <View
        style={ [styles.bubbleView, {alignItems: alignItems}, margin] }>
        <Text
          style={styles.userText} >
          {date + ' - ' + username}
        </Text>
        <Text
          style={styles.messageText}>
          {props.message.text}
        </Text>
      </View>
    </View>
  )
}

MessageRowComponent.propTypes = {
  message: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isBot: PropTypes.number.isRequired,
    userID: PropTypes.number.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 5
  },
  bubbleView: {
    backgroundColor: '#1E90FF',
    flex: 1,
    borderRadius: 8,
    padding:8
  },
  userText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
  messageText: {
    flex: 1,
    color: 'white',
    fontSize: 16
  }
});

export default MessageRowComponent;
