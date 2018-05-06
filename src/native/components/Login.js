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
    this.fbAuth = this.fbAuth.bind(this);
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
        email: ''
      });
      if(this.props.member && this.props.member.id){
        //Actions.conversation();
        Actions.myWallet();
      }
       
     })
     .catch((e) => {
       this.setState({
         ...this.state
       });
     });
  }

  fbAuth = () => {
    const responseInfoCallback = (error, result) => {
      if (error) {
        alert('Error fetching data: ' + error.toString());
      } else {
        this.props.onFacebookRegister({
          "facebook_id": result.id,
          "nombre": result.name
        })
          .then(() => {
            this.setState({
              password: '',
              email: ''
            });
            if(this.props.member && this.props.member.id){
              Actions.conversation();
            }
          })
          .catch((err) =>{
              console.log("err ->", err);
          });
      }
    };

    LoginManager.logInWithReadPermissions(['public_profile'])
    .then((result) => {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
          .then((data) => {
              const infoRequest = new GraphRequest(
                '/me?fields=name,picture',
                null,
                responseInfoCallback
              );
              new GraphRequestManager().addRequest(infoRequest).start();
            })
            .catch((err) => console.log("err ->", err))
        }
      })
      .catch((error) => {
        console.log('Login failed with error: ' + error);
      });
  }

  render() {
    const { loading, error } = this.props;
    const data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ];
    const colors = [ 'rgb(138, 0, 230, 0.8)', 'rgb(173, 51, 255, 0.8)', 'rgb(194, 102, 255, 0.8)', 'rgb(214, 153, 255, 0.8)' ];
    const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ];

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
            <Button block onPress={this.fbAuth}>
              <Text>Ingresa con Facebook</Text>
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
