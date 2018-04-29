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

  componentDidMount() {
      this.props.loadMessages(this.props.member);
      //this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
    this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
  }

  render() {
    const { loading, error, sending } = this.props;

    return (
      <Container>
            <KeyboardAvoidingView
                behavior='position'
                style={styles.container}>

                <ScrollView contentContainerStyle={styles.contentContainer}
                  style={styles.scrollViewPanel}
                  ref='_scrollView'>
                  {/* List of messages */}
                  <MessagesList {...this.props} />

                  { loading ? <Messages message={"Cargando mensajes..."} type="info" />  : null }

                </ScrollView>

                  {/* Form for send message */}
                  <MessagesForm
                      style={styles.messageFrom}
                      {...this.props} onSendMessage={
                        (c) => {
                          this.props.loadMessages(this.props.member);
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
    flexDirection: 'column',
    backgroundColor: '#eeeeee'
  },
  contentContainer: {
    paddingTop: 20
  },
  scrollViewPanel: {
    display: 'flex',
    height: '91%'
  },
  messageFrom: {
    display: 'flex',
    flexDirection: 'row',
  }
});

export default ChatScreen;
