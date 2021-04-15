import moment from 'moment';
import React from 'react';
import {View, Text} from 'react-native';

import style from './style';

function ChatMessage(props) {
  const {message} = props;
  const isMessage = message.user.id === 'u1';

  return (
    <View style={style.container}>
      <View
        style={[
          style.messageBox,
          {
            backgroundColor: isMessage ? '#DCF8C5' : '#fff',
            marginLeft: isMessage ? 50 : 0,
            marginRight: isMessage ? 0 : 50,
          },
        ]}>
        {!isMessage && <Text style={style.name}>{message.user.name}</Text>}
        <Text style={style.message}>{message.content}</Text>
        <Text style={style.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  );
}

export default ChatMessage;
