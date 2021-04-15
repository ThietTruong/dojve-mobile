import * as React from 'react';
import {Text, View, Alert} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ChatRoomScreen from '../screens/ChatScreents/ChatRoomScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainTabNavigator from './MainTabNavigator';
import axios from 'axios';
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
export default function Chat({navigation}) {
  const handleLeaveChat = async action => {
    navigation.dispatch(action);
    try {
      await AsyncStorage.setItem('userToken', '');
    } catch (e) {
      // saving error
    }
  };
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        const action = e.data.action;

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {text: 'Stay', style: 'cancel', onPress: () => {}},
            {
              text: 'Leave',
              style: 'destructive',
              onPress: () => handleLeaveChat(action),
            },
          ],
        );
      }),
    [navigation],
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0c6157',
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: 'Dojve',
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 60,
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
              {/* <Octicons name="search" size={22} color={'white'} /> */}
              {/* <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={'white'}
              /> */}
            </View>
          ),
        }}
      />
      {/* <Stack.Screen
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
              <FontAwesome5 name="video" size={22} color={"white"} />
              <MaterialIcons name="call" size={22} color={"white"} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={"white"}
              />
            </View>
          ),
        })}
      /> */}
      {/* <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{
          title: 'ChatRoom',
        }}
      /> */}
    </Stack.Navigator>
  );
}
