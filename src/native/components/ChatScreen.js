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
  }

  componentDidMount(){
      this.props.loadMessages(this.props.member);
  }

  onMessagesSended(c){
    this.props.loadMessages(this.props.member);
  }

  render() {
    const { loading, error, sending, recording } = this.props;

    return (
      <Container>
            { error && <Messages message={error} /> }
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

                { loading ? <Messages message={"Cargando mensajes..."} type="success" />  : null }
                { recording ? <Messages message={"Kalu esta escuchando..."} type="error" />  : null }
                { sending ? <Messages message={"Enviando mensaje..."} type="info" />  : null }

                {/* Form for send message */}
                <MessagesForm {...this.props}
                      style={styles.messageFrom}
                      onSendMessage={(c) => {
                        this.onMessagesSended(c);
                      }
                }/>
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
