import React, {useState} from 'react'
import { View, Text, Image, Button, TouchableHighlight, TouchableOpacity } from 'react-native'
import * as ImagePicker from "react-native-image-picker"
import * as CameraRollPicker from 'react-native-camera-roll-picker';
import axios from "../../utility/axios";

function ImageAndVideo ({sendAMessage}) {
  const [media, setMedia] = useState({});
  const sending = (media) => {
    sendAMessage(2, media);
  };

  const handleChoosePhoto = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };
        setMedia(source.uri);
      }
    });
  }

  const createFormData = (photo, body) => {
    const data = new FormData();
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    return data;
  };

  // const handleUploadPhoto = () => {
  //   axios.post("http://localhost:5000/message/upImage", {
  //     method: "POST",
  //     body: createFormData(media, { userId: "123" })
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log("upload succes", response);
  //       alert("Upload success!");
  //       this.setState({ photo: null });
  //     })
  //     .catch(error => {
  //       console.log("upload error", error);
  //       alert("Upload failed!");
  //     });
  // };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'white' }}>
    {media && (
        <TouchableHighlight>
        <Image
          source={{ uri: media.uri }}
          style={{ width: 150, height: 150 }}
        />
        </TouchableHighlight>
    )}
    <Button title="Send Photo" onPress={sending} />
    <Button title="Choose Photo" onPress={handleChoosePhoto} />
  </View>
    )}

export default ImageAndVideo;