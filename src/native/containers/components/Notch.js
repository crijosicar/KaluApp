import React, { Component } from 'react'
import { FlatList, Text, StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import PropTypes from 'prop-types'

import Loading from '../../components/Loading';
import Messages from '../../components/Messages';
import Header from '../../components/Header';
import Spacer from '../../components/Spacer';
import MessagesList from '../MessagesList';
import MessagesForm from '../MessagesForm';

class NotchComponent extends Component {

  constructor() {
    super()
  }

  componentDidMount(){
    this.props.loadMessages(this.props.member);
  }

  onMessagesSended(c){
    this.props.loadMessages(this.props.member);
  }

  keyboardUpdate(){
    this.refs._scrollView.scrollToEnd({ animated: true })
  }

  render() {
    const { loading, error, sending, recording } = this.props;
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    return (
      <KeyboardAvoidingView
          behavior='position'
          style={styles.container}>

          <ScrollView
            contentContainerStyle={styles.contentContainer}
            style={styles.scrollViewPanel}
            bounces={false}
            overScrollMode="auto"
            ref='_scrollView'
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.refs._scrollView.scrollToEnd({ animated: false });
            }}>
            <MessagesList {...this.props} />
          </ScrollView>

        { error && !loading && !recording && !sending ? <Messages message={error} /> : null }
        { loading && !error && !recording && !sending ? <Messages message={"Cargando mensajes..."} type="success" />  : null }
        { recording && !loading && !error && !sending ? <Messages message={"Kalu esta escuchando..."} type="error" />  : null }
        { sending && !error && !recording && !sending ? <Messages message={"Enviando mensaje..."} type="info" />  : null }

        {/* Form for send message */}
        <MessagesForm {...this.props}
              style={styles.messageFrom}
              onSendMessage={(c) => {
                this.onMessagesSended(c);
              }}
              onKeyboardChange={() => {
                this.keyboardUpdate();
              }}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    height: 120
  },
  scrollViewPanel: {
    display: 'flex',
    flexDirection: 'column',
    height: 120
  },
  messageFrom: {
    display: 'flex',
    flexDirection: 'row',
    height: 50
  }
});

export default NotchComponent;
