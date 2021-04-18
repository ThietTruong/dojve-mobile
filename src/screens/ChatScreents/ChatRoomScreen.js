import React, {useState, useEffect} from 'react';
import {FlatList, ImageBackground, View, Text} from 'react-native';
import ChatMessage from '../../components/ChatMessage';
import InputBox from '../../components/InputBox';
import axios from '../../utility/axios';
import BG from '../../assets/images/BG.jpg';
import {useSelector} from 'react-redux';
const ChatRoomScreen = ({route, navigation}) => {
  const user = useSelector(state => state.user.current);
  const socket = useSelector(state => state.socket.current);
  const {idUser, idRoom} = route.params;
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    axios.get(`/message/getMessageRoom/${idRoom}`).then(res => {
      const {data} = res;
      if (!data.error) {
        setMessages(data.messages.reverse());
      }
      // else console.log(data);
    });
  }, [idRoom, idUser]);
  useEffect(() => {
    socket.on('messages', data => {
      switch (data.action) {
        case 'RECEIVE_TYPING':
          setTyping(true);
          break;
        case 'RECEIVE_DONE_TYPING':
          setTyping(false);
          break;
        case 'RECEIVE':
          let newMessage = data.message;
          console.log('mesg new', data.message);
          if (newMessage.sender === idUser) break;
          else setMessages(old => [...old, newMessage]);
          break;
        default:
          break;
      }
    });
  }, [socket, idUser]);
  const newListMessage = val => {
    if (val !== '') {
      const sendMessage = {
        type: 0,
        content: val,
        to: idRoom,
        sender: idUser,
      };
      setMessages(old => [...old, sendMessage]);
    }
  };
  return (
    <ImageBackground
      style={{
        width: '100%',
        height: '100%',
      }}
      source={BG}>
      <FlatList
        data={messages}
        renderItem={({item}) => <ChatMessage message={item} idUser={idUser} />}
        inverted
      />
      <InputBox
        newListMessage={newListMessage}
        message={messages}
        idRoom={idRoom}
        idUser={user._id}
      />
    </ImageBackground>
  );
};
export default ChatRoomScreen;
