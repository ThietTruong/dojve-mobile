import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {SearchBar} from 'react-native-elements';
const SeachFriend = () => {
  const [search, setSearch] = useState();
  const handleChangeSearch = val => {
    setSearch(val);
  };
  return (
    <View style={styles.container}>
      <Text>123</Text>
    </View>
  );
};
export default SeachFriend;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
