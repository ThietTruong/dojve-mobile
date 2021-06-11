import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionions from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import axios from '../../utility/axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const VideoCallScreen = props => {


  const { navigation, route } = props;
  const { token, user, roomId, video } = route.params;
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [sid, setSid] = useState();
  // const [status, setStatus] = useState('connected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const twilioVideo = useRef(null);

  const _onConnectButtonPress = async () => {
    setIsVideoEnabled(video)
    if (video) {
      if (Platform.OS === 'android') {
        await _requestAudioPermission();
        await _requestCameraPermission();
      }
      twilioVideo.current.connect({
        accessToken: token,
        enableNetworkQualityReporting: true,
        roomName: roomId,
        enableVideo: video
      });
      setStatus('connecting');
    } else {
      if (Platform.OS === 'android') {
        await _requestAudioPermission();
        
      }
      twilioVideo.current.connect({
        accessToken: token,
        enableNetworkQualityReporting: true,
        roomName: roomId,
        enableVideo: false,
      });
      setStatus('connecting');
    }


  };

  const _onEndButtonPress = () => {
    twilioVideo.current.disconnect();
  };

  const _onMuteButtonPress = () => {
    twilioVideo.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    twilioVideo.current.flipCamera();
  };

  const _onRoomDidConnect = ({ roomSid }) => {
    setSid(roomSid);
    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({ error }) => {

    console.log('ERROR: ', error);

    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    console.log('ERROR: ', error);

    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);
    setParticipants([...participants, participant]);
    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { enabled: true, participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    );
  };

  const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);
    let newParticipant = participants.filter(item => item.sid !== participant.sid);
    setParticipants(newParticipant);
    const videoTracks = new Map(videoTracks);
    videoTracks.delete(track.trackSid);
    setVideoTracks(videoTracks);
  };

  const _onNetworkLevelChanged = ({ participant, isLocalUser, quality }) => {

  };

  const _requestAudioPermission = () => {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Need permission to access microphone',
        message:
          'To run this demo we need permission to access your microphone',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  };

  const _requestCameraPermission = () => {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Need permission to access camera',
      message: 'To run this demo we need permission to access your camera',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
  };

  useEffect(() => {
    _onConnectButtonPress();
  }, []);
  // useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', e => {
  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();
  //       const action = e.data.action;

  //       // Prompt the user before leaving the screen
  //       Alert.alert('Conversation', 'Do you want to leave the conversation?', [
  //         { text: 'Stay', style: 'cancel', onPress: () => { } },
  //         {
  //           text: 'Leave',
  //           style: 'destructive',
  //           onPress: () => handleLeave()

  //         },
  //       ]);
  //     }),
  //   [navigation],
  // );

  const handleLeave = async () => {
    await _onEndButtonPress();
    // await _onConnectButtonPress();
    await navigation.popToTop();

  };
  const handleIsVideoEnabled = () => {
    setIsVideoEnabled(!isVideoEnabled)
  }
  return (
    <View style={styles.container}>
      {/* {status === 'disconnected' && (
        <View>
          <Text style={styles.welcome}>React Native Twilio Video</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={token}
            onChangeText={text => setToken(text)}></TextInput>
          <Button
            title="Connect"
            style={styles.button}
            onPress={_onConnectButtonPress}></Button>
        </View>
      )} */}

      {(status === 'connected' || status === 'connecting') && (
        <View style={styles.callContainer}>
          {status === 'connected' && (
            <View style={styles.remoteGrid}>
              <Swiper style={styles.listTrackVideo} >
                {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                  let nameTrackIdentifier = participants.find(item => item.sid === trackIdentifier.participantSid);
                  return (
                    <View key={trackSid}>
                      <TwilioVideoParticipantView
                        style={styles.remoteVideo}
                        trackIdentifier={{ ...trackIdentifier, enabled: true }}
                        enabled={true}
                        scaleType="fill"
                      />
                      <View style={styles.nameIndentity}>
                        <Text style={styles.textIndetity}>{nameTrackIdentifier.identity}</Text>
                      </View>
                    </View>
                  );
                })}
              </Swiper>
            </View>
          )}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={() => setIsVideoEnabled(!isVideoEnabled)}
              style={[
                styles.optionButton,
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              ]}
            >
              <Text style={{ fontSize: 12 }}>
                {isVideoEnabled ? (
                  <Feather name="video" size={22} color="#fff" />
                ) : (
                  <Feather
                    name="video-off"
                    size={22}
                    color="#fff"
                  />
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              ]}
              onPress={_onMuteButtonPress}>
              <Text style={{ fontSize: 12 }}>
                {isAudioEnabled ? (
                  <FontAwesome5 name="microphone" size={22} color="#fff" />
                ) : (
                  <FontAwesome5
                    name="microphone-slash"
                    size={22}
                    color="#fff"
                  />
                )}
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={['#DA3344', '#CF1843']}
              style={styles.optionButton}>
              <TouchableOpacity onPress={handleLeave}>
                <Text style={{ fontSize: 12 }}>
                  <FontAwesome5 name="phone-slash" size={22} color="#fff" />
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              style={[
                styles.optionButton,
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              ]}
              onPress={_onFlipButtonPress}>
              <Text style={{ fontSize: 12 }}>
                <Ionions
                  name="md-camera-reverse-sharp"
                  size={28}
                  color="#fff"
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("InviteGroup", { sid: sid })}
              style={[
                styles.optionButton,
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              ]}>
              <Text style={{ fontSize: 12 }}>
                <AntDesign
                  name="addusergroup"
                  size={28}
                  color="#fff"
                />
              </Text>
            </TouchableOpacity>
            {isVideoEnabled ? <TwilioVideoLocalView enabled={true} style={styles.localVideo} /> : <View></View>}
          </View>
        </View>
      )}


      <TwilioVideo
        ref={twilioVideo}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideo: {
    flex: 1,
    width: 150,
    height: 250,
    position: 'absolute',
    right: 0,
    bottom: windowHeight - 285,
    display: 'none'
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  remoteVideo: {
    width: windowWidth,
    height: windowHeight,
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
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
  listTrackVideo: {
  },
  videoStrackSid: {
    width: windowWidth,
    height: windowHeight,
    position: 'relative',
  },
  nameIndentity: {
    position: 'absolute',
    top: windowHeight - (windowHeight / 100) * 30,
    left: windowWidth / 2 - 20,
    fontSize: 50,
    color: '#fff',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
  },
  textIndetity: {
    textTransform: 'capitalize'
  },
  invites: {
    width: 200,
    height: 200,
  }
})
// AppRegistry.registerComponent('Example', () => Example);
export default VideoCallScreen;