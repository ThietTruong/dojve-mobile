import React, { Component , useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

function CameraRoll ({sendAMessage}) {
    const {selectedPhoto, setSelectedPhoto} = useState([]);
    const num = 0;

    const getSelectedImages = (images) => {
        var num = images.length;
        setSelectedPhoto({
          num: num,
          selected: images,
        });
        console.log(selectedPhoto.selected);
      };
      const sendAPhoto = (selectedPhoto) => {
        sendAMessage(2, selectedPhoto);
      };
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.text}>
              <Text style={styles.bold}> {num} </Text> images has been selected
            </Text>
          </View>
          <CameraRollPicker
            groupTypes='SavedPhotos'
            maximum={3}
            selected={selectedPhoto}
            assetType='Photos'
            imagesPerRow={3}
            imageMargin={5}
            callback={getSelectedImages} />
        </View>
      );

}