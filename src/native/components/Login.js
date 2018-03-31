import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Container, Content, Form,List,ListItem, Item, Label, Input, Text, Button,StyleProvider, H1, H2, H3,Body } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }).isRequired,
    error: PropTypes.string,
   // loading: PropTypes.bool.isRequired,
     onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);

    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
<<<<<<< HEAD
    this.props.onFormSubmit(this)
    //this.props.onFormSubmit(this.state)
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
=======
     this.props.onFormSubmit(this.state)
     .then(() => alert("hola"))
     .catch(e => {
       console.log(`Error: ${e}`)
       this.setState({
         ...this.state,
         email: "",
         password: ""
       });
     });
>>>>>>> 82d512dc465b48d3f7e5e589d3004aa03d168bf5
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
                fontSize: 24, textAlign:
                'center', margin: 10
              }}>
                KALU
            </Text>
          </View>

          <Spacer size={30} />
<<<<<<< HEAD
          <Button block>
            <Text>Inicio de Sesion con Facebook</Text>
=======

          <Button block onPress={this.handleSubmit}>
            <Text>Inicio de sesion con Facebook</Text>
>>>>>>> 82d512dc465b48d3f7e5e589d3004aa03d168bf5
          </Button>

          <Spacer size={30} />

          <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center'
          }}>
              <Text style={{
                fontSize: 14,
                textAlign: 'center',
                margin: 10
              }}> ó digita tus datos</Text>
          </View>

          <Spacer size={10} />

          { error && <Messages message={error} /> }

          <Spacer size={10} />

          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
              />
            </Item>

            <Spacer size={20} />

            <List>
              <ListItem onPress={Actions.forgotPassword} >
                  <Body>
                      <Text style={{
                      fontSize: 14, textAlign:
                        'center', margin: 10
                      }}>Olvidaste tu constrasena?
                    </Text>
                  </Body>
              </ListItem>
            </List>

            <Spacer size={20} />

            <Button
              success
              block
              onPress={this.handleSubmit}>
              <Text style={{
                  fontSize: 14, textAlign:
                  'center', margin: 10
                }}>Login</Text>
            </Button>

            <Spacer size={20} />

            <Button
              success
              block
              onPress={Actions.conversation}>
              <Text style={{
                  fontSize: 14, textAlign:
                  'center', margin: 10
                }}>Conversación</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Login;
