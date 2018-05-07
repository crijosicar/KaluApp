import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Form, Item, Label, Input, Title, Button, Left, Right, Body, Icon, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import { View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

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
          <Header
            title="Regístrate"
            content="Con Kalu puedes gestionar todos tus presupuestos"
          />

          {error && <Messages message={error} />}

          <Form>
            <Item floatingLabel>
              <Label>Correo electrónico</Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item floatingLabel>
              <Label>Contraseña</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item floatingLabel>
              <Label>Confirma tu contraseña</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>
          </Form>

          <Spacer size={20} />

          <Grid>
            <Col size={48}>
              <View
                style={{
                  flex: 1,
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
                <Button iconLeft light
                  onPress={() => {
                    Actions.pop();
                  }}>
                 <Icon name='arrow-back' />
                 <Text>Regresar</Text>
               </Button>
              </View>
            </Col>
            <Col size={52}>
              <View
                style={{
                  flex: 1,
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
              <Button iconRight success
                onPress={() => {
                  this.handleSubmit();
                }}>
                <Text>Registrarse</Text>
                <Icon name='arrow-forward' />
              </Button>
             </View>
            </Col>
          </Grid>

        </Content>
      </Container>
    );
  }
}

export default SignUp;
