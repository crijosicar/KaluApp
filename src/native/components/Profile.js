import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Container, Content, Form, List,Item,Label,Input, ListItem, Body, Left, Text, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from './Header';
import Spacer from './Spacer';
import Login from './Login';
const Profile = ({ member, logout,onFormSubmit }) => (
  <Container>
    <Content>
      <List>
        {(member && member.email) ?
          <View>
            <Content padder>
              <Header
                title={`Hi ${member.firstName},`}
                content={`You are currently logged in as ${member.email}`}
              />
            </Content>

            <ListItem onPress={Actions.updateProfile} icon>
              <Left>
                <Icon name="person-add" />
              </Left>
              <Body>
                <Text>Update My Profile</Text>
              </Body>
            </ListItem>
            <ListItem onPress={logout} icon>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
            </ListItem>
          </View>
        :
          <View>
            <Content padder>
            </Content>
            <View>
              <Login onPress={Actions.login}>
              </Login>
                
            </View>
            {/*   
            <ListItem onPress={Actions.login} icon>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Login</Text>
              </Body>
            </ListItem> */}
            {/* <ListItem onPress={Actions.forgotPassword} icon> 
              <Left> 
                <Icon name="help-buoy" />
              </Left>
              <Body> 
                <Text>Olvidaste tu constrasena</Text>
              </Body>
            </ListItem>*/}
            {/* <ListItem onPress={Actions.signUp} icon> 
              <Left>
                <Icon name="add-circle" />
              </Left>
              <Body>
                <Text>Sign Up</Text>
              </Body>
            </ListItem>
            */}
          </View>
        }
      </List>
    </Content>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
