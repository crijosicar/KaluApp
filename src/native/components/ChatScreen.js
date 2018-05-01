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
  }

  componentDidUpdate() {
    if(this.props.messages.length) {
      console.log("cmu", this.props);
      this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true});
    }
  }

  onMessagesSended(c){
    setTimeout(function(){
       this.props.loadMessages(this.props.member);
    }.bind(this), 1000);
  }

  render() {
    const { loading, error, sending } = this.props;

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
                  ref='_scrollView'>
                  {/* List of messages */}
                  <MessagesList {...this.props} />
                </ScrollView>

                  { loading ? <Messages message={"Cargando mensajes..."} type="info" />  : null }

                  {/* Form for send message */}
                  <MessagesForm
                      style={styles.messageFrom}
                      {...this.props}
                      onSendMessage={ (c) => { this.onMessagesSended(c) }
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
