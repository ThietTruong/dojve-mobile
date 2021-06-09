import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors.js';
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    backgroundColor: '#01ad9b',
    marginRight: 50,
    borderRadius: 5,
    padding: 10,
  },
  name: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {},
  time: {
    alignSelf: 'flex-end',
    marginBottom: 5,
    color: '#555555',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 5,
    marginTop: 5,
  },
  sticker: {
    width: 130,
    height: 130,
    marginBottom: 5,
    marginTop: 5,
  },
  gif: {
    width: 150,
    height: 150,
    marginBottom: 5,
    marginTop: 5,
  },
  imgContainer:{
    width: 200,
    height: 220,
    marginLeft: '50%',
  },
  stickerContainer:{
    width: 140,
    height: 150,
    marginLeft: '65%',
  },
  groupInvite: {
    backgroundColor: '#DCF8C5',
    borderRadius: 5,
    padding: 10,
    marginLeft: '30%'
  },
  gifContainer:{
    width: 160,
    height: 170,
    marginLeft: '60%',
  },
  videoContainer:{
    width: 200,
    height: 300,
    marginLeft: '50%',
  },
  video: {
    width: 200,
    height: 270,
    marginBottom: 5,
    marginTop: 5,
  },
});
export default styles;
