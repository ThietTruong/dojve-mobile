import React, {useEffect, useState} from 'react';
import {Text, View, Alert, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import InviteFriends from '../screens/InviteFriends';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainTabNavigator from './MainTabNavigator';
import ChatRoomScreen from '../screens/ChatScreents/ChatRoomScreen';
import UserDetail from '../screens/UserDetail';

const Stack = createStackNavigator();
export default function Chat({navigation, route}) {
  // http://10.0.2.2:5000

  const user = useSelector(state => state.user.current);

  const handleLeaveChat = async action => {
    navigation.dispatch(action);
    try {
      await AsyncStorage.setItem('userToken', '');
    } catch (e) {}
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
  const handlePressSetting = () => {
    navigation.navigate('UserDetail', {userName: user.name});
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#01ad9b',
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
            <TouchableOpacity
              onPress={handlePressSetting}
              style={{
                flexDirection: 'row',
                width: 60,
                justifyContent: 'space-between',
                marginRight: 5,
              }}>
              <MaterialCommunityIcons
                name="dots-vertical-circle-outline"
                size={26}
                color="white"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetail}
        options={({route}) => (
          console.log(route.params.userName),
          {
            title: route.params.userName,
            headerRight: () => (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: 60,
                  justifyContent: 'space-between',
                  marginRight: 5,
                }}></TouchableOpacity>
            ),
          }
        )}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({route}) => ({
          title: route.params.userName,
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
              <FontAwesome5 name="video" size={22} color={'white'} />
              <MaterialIcons name="call" size={22} color={'white'} />
              <MaterialCommunityIcons
                name="dots-vertical"
                size={22}
                color={'white'}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriends}
        title="InviteFriends"
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
    </Stack.Navigator>
  );
}
