import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Portal, Provider } from 'react-native-paper';
import Gif from '../Sticker/Gif';
import Sticker from '../Sticker/Sticker';
import ImageAndVideo from '../ImageAndVideo/index';
import styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
const InputBox = ({idUser, idRoom, message, newListMessage, user}) => {
  const socket = useSelector(state => state.socket.current);
  const [newMessage, setNewMessage] = useState();
  const [messageInput, setMessageInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [tabSelected, setTabSelected] = useState(1);
  // useEffect(() => {
  //   getTrendingGif(setGif)
  // },[]);
  const onMicrophonePress = () => {
    console.warn('On Microphone');
  };
  const onSendPress = () => {
    newListMessage(0, messageInput);
    setMessageInput('');
  };
  const onPress = () => {
    if (!message) {
      onMicrophonePress();
    } else {
      onSendPress(0, messageInput, idRoom);
    }
  };

  const onTabClick = (currentTab) => {
    setTabSelected(currentTab);
  }
  const [modalVisible, setModalVisible] = useState(false);

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
  const containerStyle = {backgroundColor: 'white', padding: 20, height: '50%', marginTop: 'auto'};
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
      <MaterialCommunityIcons name="star" size={28} color="gray"></MaterialCommunityIcons></TouchableOpacity>
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
          {!message ? (
            <MaterialCommunityIcons name="microphone" size={24} color="grey" />
            ) : (
              <MaterialIcons name="send" size={24} color="gray" />
              )}
        </View>
    </TouchableOpacity>
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.containerStyle}
        >
                <View style={styles.tabs}>
                  <View style={{height: '23%',
                      marginTop: 'auto'}}>
                   <TouchableOpacity onPress={() => onTabClick(1)}
                    state={tabSelected === 1}
                    style={styles.tabTextStyle}
                   >
                  <MaterialCommunityIcons name="gif" size={40} color="#00ad9b" borderColor="gray"></MaterialCommunityIcons></TouchableOpacity>
                  </View>
                  <View style={{height: '23%',
                      marginTop: 'auto'}}>
                  <TouchableOpacity onPress={() => onTabClick(2)}
                    state={tabSelected === 2}
                    style={styles.tabTextStyle}
                   >
                  <MaterialCommunityIcons name="sticker" size={40} color="#00ad9b"></MaterialCommunityIcons></TouchableOpacity>
                  </View>
                  <View style={{height: '23%',
                      marginTop: 'auto'}}>
                  <TouchableOpacity onPress={() => onTabClick(3)}
                    state={tabSelected === 3}
                    style={styles.tabTextStyle}
                   >
                  <MaterialCommunityIcons name="image" size={40} color="#00ad9b"></MaterialCommunityIcons></TouchableOpacity>
                  </View>
                  </View>
                  {tabSelected === 1 && (
                     <View style={{height: '50%',
                       marginTop: 'auto'}}>
          <Gif sendAMessage={newListMessage}/>
        </View>
                )}
                {tabSelected === 2 && (
                     <View style={{height: '50%',
                      marginTop: 'auto'}}>
                      <Sticker sendAMessage = {newListMessage}/>
                  </View>               
                )}
                {tabSelected === 3 && (
                     <View style={{height: '48%',
                      marginTop: 'auto'}}>
                      <ImageAndVideo sendAMessage = {newListMessage}/>
                  </View>               
                )}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style = {{alignSelf: 'center'}}>Back</Text>
                </Pressable>
          </Modal>
          </View>
    </View>
  );
};
export default InputBox;
