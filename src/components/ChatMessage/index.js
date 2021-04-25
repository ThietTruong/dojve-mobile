import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import style from './style';

function ChatMessage(props) {
  const {message, idUser} = props;
  const isMessage = message.sender == idUser;
  const socket = useSelector(state => state.socket.current);

  return (
    <View style={style.container}>
      <View
        style={[
          style.messageBox,
          {
            backgroundColor: isMessage ? '#00AD9B' : '#fff',
            marginLeft: isMessage ? 50 : 0,
            marginRight: isMessage ? 0 : 50,
          },
        ]}>
        {/* {!isMessage && <Text style={style.name}>{message.content}</Text>} */}
        <Text style={style.message}>{message.content}</Text>
        <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
}

export default ChatMessage;
