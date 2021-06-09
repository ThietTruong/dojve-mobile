import React, { useState } from 'react'
import { View, Text, Image, Button, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native'
import * as ImagePicker from "react-native-image-picker"
import axios from "../../utility/axios";
import Video from 'react-native-video';
import { combineReducers } from 'redux';
import ImagePicker1 from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
var { width, height } = Dimensions.get("window");

function ImageAndVideo({ sendAMessage }) {
  const [media, setMedia] = React.useState(null);
  const sending2 = (url) => {
    sendAMessage(2, url);
  };

  const sending1 = (url) => {
    sendAMessage(1, url);
  };
  const handleChoosePhoto = () => {
    let option1 = {
      title: 'Chose photo',
      mediaType: 'photo',
      quality: 1
    };
    ImagePicker.launchImageLibrary(option1, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('response', response);
        handleUpload(response.assets[0], sending1);
      }
    });
  }

  const handleChooseVideo = () => {
    const options2 = {
      title: 'Video Picker',
      mediaType: 'video',
    };

    const handleTakeAPhoto = () => {
      let options = {
        title: 'Chose photo',
        mediaType: 'photo',
        quality: 1
      };
      ImagePicker.launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          // const source = { uri: response.uri };
          console.log('response: ', response)
          if (response?.assets[0])
            handleUpload(response.assets[0], sending2);
        }
      });
    }

    // const handleChooseVideo = () => {
    //   const options = {
    //     title: 'Select Video',
    //     mediaType: 'video',
    //     quality: 1
    //   };

    //   ImagePicker.launchImageLibrary(options, response => {
    //     console.log("hh", response);
    //     if (response.didCancel) {
    //       console.log('User cancelled video picker');
    //     } else if (response.errorCode) {
    //       console.log('ImagePicker Error: ', response.errorMessage);
    //     } else {
    //       if(response?.assets[0])
    //         handleUploadVideo(response.assets[0],sending2); 
    //     }
    //     });
    // }

    const handleChooseVideo = () => {
      ImagePicker1.openPicker({
        mediaType: "video",
      }).then((response) => {
        if (response.didCancel) {
          console.log('User cancelled video picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          console.log('response choose video: ', response)
          handleUploadVideo(response, sending2);
        }
      });
    }
    const createFormData = (response) => {
      const data = new FormData();
      data.append('image', {
        uri: response.uri,
        type: response.type,
        name: response.fileName
      });
      return data;
    };

    const handleUpload = (response, callback) => {
      const data = createFormData(response);
      console.log("data:", data);
      // fetch(`${'http://192.168.1.2:5000'}/message/upImage`,{
      //   method: 'POST',
      //   body: data,
      //  {}
      // }).then(res=>res.json).then(data=>console.log(data));
      axios.post(`/message/upImage`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data;charset=utf-8",
            "Accept": "application/json"
          }
        }
      )
        .then(({ data }) => {
          if (!data.error && data.error !== undefined) {
            callback(data.image_url)
          }
          else throw new Error(data.message)
        })
        .catch(error => {
          alert(error.msg);
        });
    };

    const handleUploadVideo = (response, callback) => {
      const data = createFormDataVideo(response);
      axios.post(`/message/upImage`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data;charset=utf-8",
            "Accept": "application/json"
          }
        }
      )
        .then((res) => {
          const _data = res.data;
          console.log("upload succes", _data);
          if (!_data.error && _data.error !== undefined) {
            callback(_data.image_url)
          }
          else throw new Error(_data.message)
        })
        .catch(error => {
          alert(error.msg);
        });
    };


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white' }}>
        <View style={{ flexDirection: "row", alignItems: "space-between", marginBottom: 20, marginTop: '35%' }}>
          <View style={{ marginHorizontal: 20, marginLeft: 10, marginTop: 5 }}>
            <Button title="Choose Photo" onPress={handleChoosePhoto} style={{ marginHorizontal: 20, marginLeft: 45, marginTop: 5 }} />
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 5 }}>
            <Button title="Choose Video" onPress={handleChooseVideo} style={{ marginHorizontal: 20, marginTop: 5 }} />
          </View>
        </View>
      </View>
    )
  }

  export default ImageAndVideo;