import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Alert, StyleSheet, View, Image, Animated, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';

import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import MessagesList from '../containers/MessagesList';
import MessagesForm from '../containers/MessagesForm';

class ChatScreen extends Component {
  static propTypes = {
    conversation: PropTypes.shape({}).isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    conversation: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      conversation: (props.conversation) ? props.conversation : {},
    };

    this.keyboardUpdate = this.keyboardUpdate.bind(this);
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
    return (
      <Container>
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
                    this.refs._scrollView.scrollToEnd({ animated: true });
                  }}>
                  {/* List of messages */}
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
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    height: '100%'
  },
  contentContainer: {
    paddingTop: 20
  },
  scrollViewPanel: {
    display: 'flex',
    flexDirection: 'column',
    height: '91%'
  },
  messageFrom: {
    display: 'flex',
    flexDirection: 'row',
    height: '11%'
  }
});

export default ChatScreen;
