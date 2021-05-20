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
import VideoCallScreen from '../screens/VideoCallScreens';
import axios from '../utility/axios';
// import {setPartner} from '../feature/partner';
const Stack = createStackNavigator();
export default function Chat({navigation, route}) {
  const socket = useSelector(state => state.socket.current);
  const [calling, setCalling] = useState({
    status: false,
    id: '',
    sid: '',
    caller: {name: '', avatar: ''},
    video: '',
  });
  // http://10.0.2.2:5000
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.current);
  const [partner, setPartner] = useState();
  const handleLeaveChat = async action => {
    navigation.dispatch(action);
    try {
      await AsyncStorage.setItem('userToken', '');
    } catch (e) {}
  };
  useEffect(() => {
    socket.on('videocall', data => {
      if (data.action == 'RECEIVE') {
        // setCalling({
        //   status: true,
        //   id: data.roomId,
        //   sid: data.sid,
        //   caller: data.caller,
        //   video: data.video,
        // });
        console.log("day la data: ",data);
        axios
          .get(`/call/joinRoom?sid=${data.sid}`)
          .then(res => {
            const {data} = res;
            console.log('get token resoponse', data);
            navigation.navigate('VideoCallScreen', {
              user: user,
              token: data.token,
              video: true,
              roomid: user.name,
            });
          })
          .catch(err => console.log('reject', err.msg));
      }
    });
  }, [socket]);
  useEffect(
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
  const handleOnpressVideoCall = roomid => {
    axios
      .get(`/call/getToken?roomid=${roomid}`)
      .then(res => {
        const {data} = res;
        if (!data.error && data.error !== undefined) {
          socket.emit(
            'videocall',
            {
              action: 'startCall',
              aToken: data.token,
              roomId: roomid,
              sid: data.roomSID,
              video: true,
            },
            (error, msg) => {
              if (error) console.log(error);
              console.log(msg);
            },
          );
          navigation.navigate('VideoCallScreen', {
            user: user,
            token: data.token,
            video: true,
            roomid: roomid,
          });
        }
      })
      .catch(err => console.log(err));
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
        options={({route}) => ({
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
        })}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({route}) => (
          console.log('route', route.params),
          setPartner(route.params.partner),
          {
            title: route.params.userName,
            headerRight: () => (
              <View
                style={{
                  flexDirection: 'row',
                  width: 100,
                  justifyContent: 'space-between',
                  marginRight: 10,
                }}>
                <TouchableOpacity
                  onPress={() => handleOnpressVideoCall(route.params.idRoom)}>
                  <FontAwesome5 name="video" size={22} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons name="call" size={22} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={22}
                    color={'white'}
                  />
                </TouchableOpacity>
              </View>
            ),
          }
        )}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriends}
        title="InviteFriends"
      />
      <Stack.Screen
        name="VideoCallScreen"
        component={VideoCallScreen}
        title="Video call"
        options={({route}) => ({
          title: route.params.user.name ? route.params.user.name : partner.name,
        })}
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
