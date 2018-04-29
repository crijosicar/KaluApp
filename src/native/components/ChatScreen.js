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

  render() {
    const { loading, error, sending } = this.props;

    // Loading
    //if (loading) return <Loading />;

    return (
      <Container>
            <KeyboardAvoidingView
                behavior='padding'
                style={styles.container}>

                {/* sending && <Messages message={"Enviando mensaje..."} type="info" /> */}
                { loading && <Messages message={"Cargando mensajes..."} type="info" /> }

                <ScrollView
                  contentContainerStyle={styles.contentContainer}>
                  {/* List of messages */}
                  <MessagesList {...this.props} />
                </ScrollView>

                  {/* Form for send message */}
                  <MessagesForm
                    style={styles.containerMessage}
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
    //flex: 1,
    paddingTop: 20
  },
});

export default ChatScreen;
