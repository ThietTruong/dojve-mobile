import React, {useState} from 'react';
import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
const InputBox = ({idUser, idRoom, message, newListMessage}) => {
  const socket = useSelector(state => state.socket.current);
  const [newMessage, setNewMessage] = useState();
  const [messageInput, setMessageInput] = useState('');
  const [typing, setTyping] = useState(false);
  const onMicrophonePress = () => {
    console.warn('On Microphone');
  };
  const onSendPress = () => {
    const sendMessage = {
      type: 0,
      content: messageInput,
      to: idRoom,
      sender: idUser,
    };
    // setMessages(old => [...old, sendMessage]);
    newListMessage(messageInput);
    socket.emit(
      'messages',
      {
        action: 'SEND',
        message: sendMessage,
        room: idRoom,
      },
      r => {
        if (r) console.log(r);
      },
    );
    socket.emit(
      'messages',
      {
        action: 'SEND_DONE_TYPING',
        to: idRoom,
      },
      r => {
        if (r) console.log(r);
      },
    );
    setMessageInput('');
  };
  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress();
    }
  };

  const onTextChange = val => {
    setMessageInput(val);
    if (!message.length > 1) {
      socket.emit(
        'messages',
        {
          action: 'SEND_TYPING',
          to: idRoom,
        },
        r => {
          if (r) console.log(r);
        },
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput
          placeholder={'Type a message'}
          style={styles.textIput}
          multiline
          numberOfLines={3}
          value={messageInput}
          onChangeText={onTextChange}
        />
        <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
        {!messageInput && (
          <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
        )}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!messageInput ? (
            <MaterialCommunityIcons name="microphone" size={24} color="white" />
          ) : (
            <MaterialIcons name="send" size={24} color="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default InputBox;
