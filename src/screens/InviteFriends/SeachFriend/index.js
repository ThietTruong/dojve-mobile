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
      <SearchBar
        placeholder="Type Here..."
        onChangeText={val => handleChangeSearch(val)}
        value={search}
        inputStyle={{backgroundColor: 'white'}}
        containerStyle={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 5,
        }}
        placeholderTextColor={'#g5g5g5'}
      />
    </View>
  );
};
export default SeachFriend;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
