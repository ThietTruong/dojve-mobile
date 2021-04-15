import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SplashScreen from './SplashScreen';
import ChatRoomScreen from './ChatScreents/ChatRoomScreen';
import Chat from '../navigation/Chat';
const RootStack = createStackNavigator();
const RootStackScreen = ({Navigator}) => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SignInScreen" component={SignInScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <RootStack.Screen name="Chat" component={Chat} />
      <RootStack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({route}) => ({
          title: route.params.name,
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
              {/* <FontAwesome5 name="video" size={22} color={"white"} />
              <MaterialIcons name="call" size={22} color={"white"} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"white"}
              /> */}
            </View>
          ),
        })}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
