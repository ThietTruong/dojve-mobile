import React from 'react';
import {FlatList, ImageBackground, View, Text} from 'react-native';
import chatRoomData from '../../data/Chats';
import ChatMessage from '../../components/ChatMessage';
import InputBox from '../../components/InputBox';
import BG from '../../assets/images/BG.jpg';
const ChatRoomScreen = () => {
  return (
    <ImageBackground
      style={{
        width: '100%',
        height: '100%',
      }}
      source={BG}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({item}) => <ChatMessage message={item} />}
        inverted
      />
      <InputBox />
    </ImageBackground>
  );
};
export default ChatRoomScreen;
