import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import axios from '../../../utility/axios';
import ItemFriend from '../../../components/ItemFriend';

import {SearchBar} from 'react-native-elements';
const SeachFriend = () => {
  const [people, setPeople] = useState(undefined);
  const socket = useSelector(state => state.socket.current);

  const [search, setSearch] = useState();

  const handleChangeSearch = val => {
    setSearch(val);
  };
  useEffect(() => {
    axios.get('/user').then(res => {
      const {data} = res;
      if (!data.error) {
        setPeople(data.users);
      }
    });
  }, []);
  const sendRequest = id => {
    console.log('id', id);
    const data = {
      action: 'SEND',
      to: id,
    };
    socket.emit('friends', data, res => {});
  };

  return (
    <View style={styles.container}>
      <SearchBar
        lightTheme={true}
        placeholder="Search Friend..."
        onChangeText={handleChangeSearch}
        value={search}
      />
      <View style={styles.people}>
        <FlatList
          data={people}
          renderItem={person => (
            <ItemFriend person={person} sendRequest={sendRequest} />
          )}
          keyExtractor={person => person._id}
        />
      </View>
    </View>
  );
};
export default SeachFriend;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  people: {
    paddingHorizontal: 20,
  },
});
