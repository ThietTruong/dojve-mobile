import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../utility/axios';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import NothingScreen from '../../utility/NothingScreen'
import OnlineItem from '../../components/OnlineItem';
function Status() {
  const [roomsIsActive, setRoomIsActive] = useState([]);
  const user = useSelector(state => state.user.current);
  console.log("user nefffffff", user);
  const socket = useSelector(state => state.socket.current);
  const rooms = useSelector(state => state.rooms.rooms);
  return (
    <View style={styles.status}>
      <FlatList
        data={rooms}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <OnlineItem room={item} userId={user._id} />}
      />
    </View>
  )
}

export default Status;
const styles = StyleSheet.create({
  status: {
    flex: 1,
  }
})
