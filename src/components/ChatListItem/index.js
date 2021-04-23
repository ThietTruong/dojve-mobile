import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChatRoom} from '../../types';
import styles from './style';
import moment from 'moment';
import {useSelector} from 'react-redux';

function ChatListItem(props) {
  const {room, idUser} = props;
  const [partner, setPartner] = useState(null);
  const socket = useSelector(state => state.socket.current);
  useEffect(() => {
    const partner = room.members.find(el => el._id !== idUser);
    setPartner(partner);
  }, [idUser, partner]);
  useEffect(() => {
    socket.emit('join', {
      _id: room._id,
    });
  }, []);
  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('ChatRoom', {
      idUser: idUser,
      partner: partner,
      idRoom: room._id,
    });
    // console.warn('click on', user.name);
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{uri: 'null'}} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{partner ? partner.name : ''}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {room.lastMessage.content}
            </Text>
          </View>
        </View>

        <Text style={styles.time}>
          {room.lastMessage &&
            moment(room.lastMessage.createdAt).format('DD/MM/YYYY')}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
export default ChatListItem;