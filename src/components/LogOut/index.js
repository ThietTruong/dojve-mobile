import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
const LogOut = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={['#08d4c4', '#01ab9d']}
        style={styles.mainContainer}>
        <FontAwesome
          style={styles.icon}
          name="power-off"
          size={22}
          color="white"
        />
        <Text style={styles.text}>Log Out</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LogOut;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 100,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  mainContainer: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 15,
  },
});
