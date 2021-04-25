import React from 'react';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import Watermelon from '../assets/images/Watermelon.png';
import * as Animatable from 'react-native-animatable';
const Nothing = () => {
  return (
    <View style={styles.container}>
      <Animatable.Image
        style={styles.imageBackground}
        source={Watermelon}
        animation="zoomIn"
      />
      <Animatable.View style={styles.title} animation="fadeInUp">
        <Text style={styles.text}>Nothing here</Text>
      </Animatable.View>
    </View>
  );
};
export default Nothing;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  imageBackground: {
    width: '100%',
    height: '80%',
    position: 'absolute',
  },
  title: {
    backgroundColor: '#08d4c4',
    padding: 10,
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 10,
    opacity: 0.8,
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
});
