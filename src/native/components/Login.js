import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form,List,ListItem, Item, Label, Input, Text, Button,StyleProvider, H1, H2, H3,Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { LoginManager, AccessToken, GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import { View, Image, TouchableOpacity, TouchableHighlight} from 'react-native';

class Login extends React.Component {
  static propTypes = {
      member: PropTypes.shape({
      email: PropTypes.string,
    }).isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    member: {}
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
     this.props.onLogin(this.state)
     .then(() => {
       this.setState({
         password: '',
       });
       Actions.conversation();
     })
     .catch((e) => {
       this.setState({
         ...this.state
       });
     });
  }
  fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              const infoRequest = new GraphRequest(
                '/me?fields=name,picture',
                null,
                this._responseInfoCallback
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();

            },
             //Create response callback.
            _responseInfoCallback = (error, result) => {
            if (error) {
              alert('Error fetching data: ' + error.toString());
            } else {
              alert('Result Name: ' + result.name);
              console.log('nombre:' + result.name.toString() + ' id:' + result.id.toString());
             
             //validateUserFacebookCreated
             this.props.onFacebookReg(result.id);
             
              }
            }

          )
          Actions.conversation();
          console.log('Login was successful with permissions: '
            + result.grantedPermissions.toString());
        }
      },
      function (error) {
        console.log('Login failed with error: ' + error);
      }
    );
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
            <Image
              style={{width: 50, height: 50}}
              source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            />
          </View>

          <Spacer size={30} />

          <View>
            <Button block onPress={this.fbAuth.bind(this)}>
              <Text>Ingresa with Facebook</Text>
            </Button>
          </View>

          <Spacer size={30} />

          <TouchableHighlight
            onPress={Actions.signUp}
            style={{
              flex: 1, justifyContent: 'center',
              alignItems: 'center'
            }}>

            <Text style={{
                fontSize: 14,
                textAlign: 'center',
                margin: 10
              }}> ó digita tus datos
            </Text>
            
          </TouchableHighlight>

          <Spacer size={10} />

          { error && <Messages message={error} /> }

          <Spacer size={10} />

          <Form>
            <Item stackedLabel>
              <Label>Correo electrónico</Label>
              <Input
                autoCapitalize="none"
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>Contraseña</Label>
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
                      }}>¿Olvidaste tu constraseña?
                    </Text>
                  </Body>
              </ListItem>
            </List>

            <Spacer size={20} />

              <Button
                success
                block
                onPress={() => {
                  this.handleSubmit();
                }}>
                <Text style={{
                    fontSize: 14, textAlign:
                    'center', margin: 10
                  }}>Iniciar sesión</Text>
              </Button>

              <Spacer size={20} />

          </Form>
        </Content>
      </Container>
    );
  }
}

export default Login;
