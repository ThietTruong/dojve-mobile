import React from 'react';
import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
const SpinnerScreen = ({spinner}) => {
  return (
    <Spinner
      visible={spinner}
      textContent={'Loading...'}
      textStyle={styles.spinnerTextStyle}
    />
  );
};
export default SpinnerScreen;
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#fff',
  },
});
