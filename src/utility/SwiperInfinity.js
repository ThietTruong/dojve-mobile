import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Paging from 'react-native-infinite-swiper';

const MyPager = () => {
  return (
    <Paging
      style={styles.viewPager}
      loop
    >
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
    </Paging>
  );
};
export default MyPager;

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});