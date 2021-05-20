import React, {useState} from 'react'
import { View, Text, Image, Button, TouchableHighlight, TouchableOpacity,Dimensions } from 'react-native'
import * as ImagePicker from "react-native-image-picker"
import * as CameraRollPicker from 'react-native-camera-roll-picker';
import axios from "../../utility/axios";
import Video from 'react-native-video';

var { width, height } = Dimensions.get("window");

function ImageAndVideo ({sendAMessage}) {
  const [media, setMedia] = useState(null);
  const sending2 = (media) => {
    sendAMessage(2, media);
  };

  const sending1 = (media) => {
    sendAMessage(1, media);
  };
  const handleChoosePhoto = () => {
    let option1 = {
      title: 'Chose Photo',
      maxWidth: 300,
      maxHeight: 300,
      noData: true,
      mediaType: 'photo',
      storageOptions: {
        skipBackup: true
      }
    };
    const options2 = {
      title: 'Select video',
      mediaType: 'video',
      path:'video',
      quality: 1
    };

    ImagePicker.launchImageLibrary(option1, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setMedia(response.uri);
      }
    });
  }
  
  const handleChoosePhoto2 = () => {
    const options2 = {
      title: 'Select video',
      mediaType: 'video',
      path:'video',
      quality: 1
    };

    ImagePicker.launchImageLibrary(options2, response => {
      if (response.didCancel) {
        console.log('User cancelled videp picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setMedia(response.uri);
      }
    });
  }

  // const handleChoosePhoto = () => {
  //     ImagePicker.launchImageLibrary({}, (response) => {
  //       console.log('Respose =', response);
  //       setMedia(response.uri);
  //       if (response.didCancel) {
  //         alert('Cancelled');
  //       } else if (response.error) {
  //         alert('Error: ', error);
  //       } else {
  //         const source = {uri:response.uri};
  //       }
  //     });
  //   }

  let uploadImage = async () => {
    if (media != null) {
      const fileToUpload = media;
      const data =  createFormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      let res = await fetch(
        'http://localhost:5000/message/upImage',
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } else {
      alert('Please Select File first');
    }
};

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' ,backgroundColor: 'white' }}>
    {media ? (
        <TouchableHighlight onPress = {() => sending1(media)}>
        <Image
          source={{ uri: media }}
          style={{ width: 300, height: 300 }}
        />
        </TouchableHighlight>
    ) : (
    <TouchableHighlight onPress = {() => sending2(media)}>
    <Video
      source={{ uri: media }}
      style={{ width: 300, height: 300 }}
    />
    </TouchableHighlight>)}
    <View style={{ flexDirection:"row", alignItems: "space-between"}}>
    <View>
      <Button title="Choose Photo" onPress={handleChoosePhoto} style={{ marginHorizontal: 20, marginTop: 5 }}/>
    </View>
    <View>
      <Button title="Choose Video" onPress={handleChoosePhoto2} style={{ marginHorizontal: 20, marginTop: 5 }} />
    </View>
    </View>
  </View>
    )}

export default ImageAndVideo;