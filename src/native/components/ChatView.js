import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { StyleSheet, Text, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';

class ChatView extends Component {

  constructor(props) {
    super(props);
    this.onSendMessage = this.onSendMessage.bind(this);
  }

  onSendMessage(e) { // (1)
    this.props.onSendMessage(e.nativeEvent.text);
    this.refs.input.clear();
  }

  renderItem({item}) { // (3)
      const action = item.action;
      const name = item.name;

      if (action == 'join') {
          return <Text style={ styles.joinPart }>{ name } has joined</Text>;
      } else if (action == 'part') {
          return <Text style={ styles.joinPart }>{ name } has left</Text>;
      } else if (action == 'message') {
          return <Text>{ name }: { item.message }</Text>;
      }
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

            <FlatList data={ this.props.messages }
                      renderItem={ this.renderItem }
                      styles={ styles.messages } />

            <TextInput autoFocus
                       keyboardType="default"
                       returnKeyType="done"
                       enablesReturnKeyAutomatically
                       style={ styles.input }
                       blurOnSubmit={ false }
                       onSubmitEditing={ this.onSendMessage }
                       ref="input" />

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingTop: Constants.statusBarHeight
    },
    messages: {
      alignSelf: 'stretch'
    },
    input: {
      alignSelf: 'stretch'
    },
    joinPart: {
      fontStyle: 'italic'
    }
});

export default ChatView;
