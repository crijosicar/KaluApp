import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import { GiftedChat } from 'react-native-gifted-chat'

class MainChat extends React.Component {
  static propTypes = {
    conversation: PropTypes.shape({}),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    conversation: {},
    chat: [],
  }

  constructor(props) {
    super(props);
    console.log("props -> ", props);
    this.state = {
      conversation: (props.conversation) ? props.conversation : '',
      chat: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSend(chat = []) {
    this.setState(previousState => ({
      chat: GiftedChat.append(previousState.chat, chat),
    }))
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => alert("hola"))
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Kalu Assistant"
            content="Disfruta de tu nuevo asistente virtual."
          />

          {error && <Messages message={error} />}

          <GiftedChat
            messages={this.state.chat}
            onSend={chat => this.onSend(chat)}
            user={{
              _id: 1,
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default MainChat;
