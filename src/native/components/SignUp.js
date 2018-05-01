import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import { View } from 'react-native';

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onSignUp: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onUserResetData();
  }

  componentDidUpdate(){
    if(typeof this.props.member.id != "undefined"){
      if(this.props.member.id != ""){
        Actions.conversation();
      }
    }
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onSignUp(this.state)
      .then(() => {
        this.props.onLogIn({
          "email": this.state.email,
          "password": this.state.password
        });
      })
      .catch(e => console.log(`Error: ${e}`));
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
            Registro de Usuarios
        </Text>
        </View>

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

          {error && <Messages message={error} />}

          <Form>
            <Item stackedLabel>
              <Label>Correo electrónico</Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Contraseña</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item stackedLabel>
              <Label>Confirma tu contraseña</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>

            <Spacer size={20} />

            <Button success block onPress={this.handleSubmit}>
              <Text>Crear cuenta</Text>
            </Button>

            <Spacer size={20} />

            <Button warning block onPress={Actions.login}>
              <Text>Ingresar</Text>
            </Button>

          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
