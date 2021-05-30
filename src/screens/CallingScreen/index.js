import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import axios from '../../utility/axios';
const CallingScreen = ({ route, navigation }) => {
  const { caller, user, token, video, roomid } = route.params;
  console.log("caller", caller);
  const socket = useSelector(state => state.socket.current);

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
        axios
          .get(`/call/joinRoom?sid=${data.sid}`)
          .then(res => {
            const { data } = res;
            if (data)
              console.log("data o day neeeee", data)
          })
          .catch(err => console.log('reject', err.msg));
      }
    });
  }, [socket])

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.inforPartner}
        colors={['#0C211F', '#0A090F']}>
        <Animatable.View
          animation="rubberBand"
          iterationCount="infinite"
          style={styles.wrapDes}>
          <Image style={styles.avatar} />
          <View style={styles.des}>
            <Text style={styles.username}>{caller && caller.name}</Text>
            <Text style={styles.desCall}>Incoming Call</Text>
          </View>
        </Animatable.View>
      </LinearGradient>
      <View style={styles.action}>
        <View
          style={styles.buttonAction}>
          <LinearGradient
            colors={['#DA3344', '#CF1843']}
            style={styles.optionButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 12 }}>
                <FontAwesome5 name="phone-slash" size={22} color="#fff" />
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View
          style={styles.buttonAction}>
          <LinearGradient
            colors={['#36D5A5', '#22BE77']}
            style={styles.optionButton}>
            <TouchableOpacity onPress={() => navigation.navigate('VideoCallScreen', {
              user,
              token,
              video,
              roomid,
            })}>
              <Text style={{ fontSize: 12 }}>
                <FontAwesome5 name="phone-alt" size={22} color="#fff" />
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inforPartner: {
    flex: 1,
    backgroundColor: '#0A090F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    width: '100%',
    height: 150,
    backgroundColor: '#0A090F',
    flexDirection: 'row',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20,
    backgroundColor: '#01ad9b',
    margin: 30,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 24,
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  buttonAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  des: {
    justifyContent: 'center',
  },
  desCall: {
    color: '#797E82',
    textAlign: 'center',
  },
  wrapDes: {
    padding: 80,

    borderRadius: 2000,
  },
});
export default CallingScreen;
