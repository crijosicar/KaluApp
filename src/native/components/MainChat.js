import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Item, Label, Input, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

class MainChat extends Component {
  static propTypes = {
    conversation: PropTypes.shape({}).isRequired,
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

    this.state = {
      conversation: (props.conversation) ? props.conversation : '',
      chat: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){

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

          { error && <Messages message={error} /> }

        </Content>
      </Container>
    );
  }
}

export default MainChat;
