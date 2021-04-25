import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import axios from '../../../utility/axios';
import {useSelector, useDispatch} from 'react-redux';
import {addRoom} from '../../../feature/rooms';
import {deleteRequest, setRequest} from '../../../feature/friendRequest';
import ItemRequest from '../../../components/ItemRequest';
import Nothing from '../../../utility/NothingScreen';
const FriendRequest = () => {
  const dispatch = useDispatch();
  const socket = useSelector(state => state.socket.current);
  const rooms = useSelector(state => state.rooms.rooms);
  const invites = useSelector(state => state.invites.request);
  // get request
  useEffect(() => {
    axios
      .get('/user/getListFriendRequest')
      .then(res => {
        const {data} = res;
        if (!data.error) {
          dispatch(setRequest(data.requests));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [dispatch, socket]);
  const acceptRequest = _id => {
    dispatch(deleteRequest(_id));
    socket.emit(
      'friends',
      {
        action: 'ACCEPT',
        to: _id,
      },
      (err, room) => {
        if (err) console.log(err);
        else dispatch(addRoom(room));
      },
    );
  };

  return (
    <View style={styles.container}>
      {invites.length == 0 ? (
        <Nothing />
      ) : (
        <FlatList
          data={invites}
          renderItem={request => (
            <ItemRequest inforRequest={request} acceptRequest={acceptRequest} />
          )}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
};
export default FriendRequest;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
