import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {View, Text,Image} from 'react-native';
import {useSelector} from 'react-redux';
import style from './style';

function ChatMessage(props) {
  const {message, idUser} = props;
  const isMessage = message.sender == idUser;
  const socket = useSelector(state => state.socket.current);

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
               marginLeft: isMessage ? 50 : 0,
               marginRight: isMessage ? 0 : 50,
             },
           ]}>
          <Text style={style.message}>{message.content}</Text>
          <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
          </View>
        ): (
          <View style={style.imgContainer}>
          <Image style={style.image} source = {{uri: message.content}}/>
          <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
          </View>
        )
        }
      </View>
    </View>
  );
}

export default ChatMessage;
