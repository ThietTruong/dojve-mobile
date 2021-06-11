import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import ChatListItem from '../../components/ChatListItem';
import { useSelector } from 'react-redux';

export default function ChatsScreen() {
  const rooms = useSelector(state => state.rooms.rooms);
  const user = useSelector(state => state.user.current);
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={rooms}
        renderItem={({ item }) => <ChatListItem room={item} idUser={user._id} />}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
