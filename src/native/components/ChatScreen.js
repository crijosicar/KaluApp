import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Alert, StyleSheet, View, Image, Animated, Keyboard, KeyboardAvoidingView} from 'react-native';

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

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
            <KeyboardAvoidingView
                behavior='padding'
                style={styles.container}
                keyboardVerticalOffset={64}>

                {/* List of messages */}
                <MessagesList {...this.state} />

                {/* Form for send message */}
                <MessagesForm {...this.props} />
            </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#eeeeee'
  }
});

export default ChatScreen;
