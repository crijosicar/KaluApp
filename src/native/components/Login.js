import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, List, ListItem, Item, Label, Input, Text, Button,StyleProvider, H1, H2, H3, Body, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import { View, Image, TouchableOpacity, TouchableHighlight, KeyboardAvoidingView, Platform } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

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
        Actions.conversation();
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
    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={
              Platform.select({
                 ios: () => 0,
                 android: () => 200
              })()
            }>

            <Spacer size={40}/>

            <View style={{
              flex: 1,
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'center'
            }}>
              <View>
                <Image
                  style={styles.icon}
                  source={require('../../images/icon-app.png')}
                />
              </View>
              <View>
                <H3>Kalu</H3>
              </View>
            </View>

            <Spacer size={40}/>

            <Grid>
              <Col size={15}>
              </Col>
              <Col size={70}>
                <View style={{
                  flex: 1,
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'center'
                }}>
                  <Button iconRight primary block onPress={this.fbAuth}>
                    <Text>Ingresa con</Text>
                    <Icon type="FontAwesome" name="facebook" />
                  </Button>
                </View>
              </Col>
              <Col size={15}>
              </Col>
            </Grid>

            <Spacer size={20} />

            { error && <Messages message={error} /> }

            <Form>
              <Item floatingLabel>
                <Label>Correo electrónico</Label>
                <Input
                  autoCapitalize="none"
                  value={this.state.email}
                  keyboardType="email-address"
                  onChangeText={v => this.handleChange('email', v)}/>
              </Item>

              <Item floatingLabel>
                <Label>Contraseña</Label>
                <Input
                  secureTextEntry
                  onChangeText={v => this.handleChange('password', v)}/>
              </Item>

              <Spacer size={20} />

              <Button
                success
                block
                iconRight
                onPress={() => {
                  this.handleSubmit();
                }}>
                <Text>Iniciar sesión</Text>
                <Icon name='arrow-forward' />
              </Button>

              </Form>

              <Spacer size={30} />

              <View style={{
                    flex: 1,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center'
                  }}>
                <Button transparent info
                  onPress={() => {
                    Actions.signUp();
                  }}>
                  <Text style={{ fontSize: 15 }}>{"¿No estas registrado?, Registrate aquí"}</Text>
                </Button>
              </View>

            </KeyboardAvoidingView>
          </Content>
        </Container>
      );
    }
  }

  const styles = {
    icon: {
        flex: 1,
        width: 120,
        height: 120,
        resizeMode: 'contain'
    }
  }

  export default Login;
