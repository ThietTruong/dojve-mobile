import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from '../../utility/axios';
import InviteItem from '../../components/InviteItem';
function InviteGroup({ route, navigation }) {
  const { sid } = route.params;
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const socket = useSelector((state) => state.socket.current);
  const user = useSelector((state) => state.user.current);


  useEffect(() => {
    setLoading(true);
    axios
      .get("/rooms")
      .then(({ data }) => {
        if (!data.error && data.error !== undefined) {
          const rooms = data.rooms;
          console.log(rooms);
          const twoMem = rooms.filter((r) => r.members.length === 2);
          const friends = twoMem.map((r) => {
            const u = r.members.find((mem) => mem._id !== user._id);
            u.roomId = r._id;
            return u;
          });
          setFriends(friends);
          setLoading(false);
        }
      })
      .catch((err) => {
        message.error("Some thing wrong!, " + err.msg);
      });
  }, [user]);
  const handleInvite = (roomId) => {
    const sendMessage = {
      type: 5,
      content: sid,
      to: roomId,
      sender: {
        name: user.name,
        _id: user._id,
        email: user.email,
      },
    };
    socket.emit(
      "messages",
      {
        action: "SEND",
        message: sendMessage,
        room: roomId,
      },
      (r) => {
        if (r) console.log(r);
      }
    );
  };
  return (
    <View style={styles.inviteGroup}>
      <FlatList
        data={friends}
        keyExtractor={friend => friend.id}
        renderItem={({ item }) => <InviteItem friend={item} handleInvite={handleInvite} />}
      />
    </View>
  )
}

export default InviteGroup;

const styles = StyleSheet.create({
  inviteGroup: {
    flex: 1,
    paddingHorizontal: 15
  }
})