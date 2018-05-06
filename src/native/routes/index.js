import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import MyWalletContainer from '../../containers/MyWallet';
import MyWalletComponent from '../components/MyWallet';

import MyPredictionContainer from '../../containers/MyPrediction';
import MyPredictionComponent from '../components/MyPrediction';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import AboutComponent from '../components/About';

import ChatScreenContainer from '../../containers/ChatScreen';
import ChatScreenComponent from '../components/ChatScreen';

const Index = (
    <Scene hideNavBar>
          {/*<Scene
            key="profileHome"
            title="Perfil"
            component={MemberContainer}
            Layout={ProfileComponent}
            />*/}

          <Scene
            key="login"
            title="LOGIN"
            component={LoginContainer}
            Layout={LoginComponent}
            />
            <Scene
              back
              key="signUp"
              title="SIGN UP"
              component={SignUpContainer}
              Layout={SignUpComponent}
              />
          <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
            />
          <Scene
            back
            key="myWallet"
            title="MI CARTERA"
            component={MyWalletContainer}
            Layout={MyWalletComponent}
            />
            <Scene
            back
            key="myForecast"
            title="MI PRONÓSTICO"
            component={MyPredictionContainer}
            Layout={MyPredictionComponent}
            />
          {/*<Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
            />*/}
          <Scene
            key="conversation"
            title="CONVERSACIÓN"
            component={ChatScreenContainer}
            Layout={ChatScreenComponent}
            />
  </Scene>
);

export default Index;
