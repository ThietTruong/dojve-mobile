import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import style from './style';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import { Button } from 'react-native';

function ChatMessage(props) {
  const { message, idUser } = props;
  const isMessage = message.sender._id == idUser || message.sender == idUser;
  const socket = useSelector(state => state.socket.current);
  const videoPlayer = useRef(null);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);

  const onSeek = (seek) => {
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

  const onPaused = (newState) => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === 'android') {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = (data) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };
  return (
    <View style={style.container}>
      <View>
        {/* {!isMessage && <Image source={message.content} />} */}
        {message.type === 0 ? (
          <View
            style={[
              style.messageBox,
              {
                backgroundColor: isMessage ? '#DCF8C5' : '#fff',
                alignSelf: !isMessage ? "flex-start" : 'flex-end',
              },
            ]}>
            <Text style={style.message}>{message.content}</Text>
            <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
          </View>
        ) : (message.type === 1 ? (
          <View style={style.imgContainer}>
            <Image style={style.image} source={{ uri: message.content }} />
            <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
          </View>
        ) : (message.type === 2 ? (
          <View style={style.videoContainer}>
            <Video
              style={style.video}
              source={{ uri: message.content }}
              onEnd={onEnd}
              onLoad={onLoad}
              onLoadStart={onLoadStart}
              posterResizeMode={'cover'}
              onProgress={onProgress}
              paused={paused}
              ref={(ref) => (videoPlayer.current = ref)}
              resizeMode={'cover'} />
            <MediaControls
              style={style.video}
              isFullScreen={false}
              duration={duration}
              isLoading={isLoading}
              progress={currentTime}
              onPaused={onPaused}
              onReplay={onReplay}
              onSeek={onSeek}
              onSeeking={onSeeking}
              mainColor={"red"}
              playerState={playerState}
              sliderStyle={{ containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
            />
            <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
          </View>
        ) : (message.type === 4 ? (
          <View style={style.gifContainer}>
            <Image style={style.gif} source={{ uri: message.content }} />
            <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
          </View>
        ) : (message.type === 1 ? (
          <View style={style.imgContainer}>
            <Image style={style.image} source={{ uri: message.content }} />
            <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
          </View>
        ) : (message.type === 5 ? (
          <View style={style.groupInvite}>
            <Text style={{ fontWeight: 'bold', fontSize: 16.5 }}> {message.sender.name} have sent you an invitation</Text>
            <Button style={{ alignItems: 'center', justifyContent: 'space-between' }} color="#00ad9b" title="Join" />
            <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
          </View>
        ) : null)))))
        }
      </View>
    </View>
  );
}

export default ChatMessage;
