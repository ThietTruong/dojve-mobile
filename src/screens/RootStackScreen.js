import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SplashScreen from './SplashScreen';
import ChatRoomScreen from './ChatScreents/ChatRoomScreen';
import Chat from '../navigation/Chat';
const RootStack = createStackNavigator();
const RootStackScreen = ({navigator, route}) => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <RootStack.Screen name="Chat" component={Chat} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
