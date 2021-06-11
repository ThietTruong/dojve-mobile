import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors.js';
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    alignSelf: "flex-end",
    backgroundColor: '#01ad9b',
    borderRadius: 5,
    padding: 10,
    maxWidth: "80%"
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
  imgContainer: {
    width: 200,
    height: 220,
  },
  stickerContainer: {
    width: 140,
    height: 150,
  },
  groupInvite: {
    backgroundColor: '#DCF8C5',
    borderRadius: 5,
    padding: 10,
  },
  gifContainer: {
    width: 160,
    height: 170,
  },
  videoContainer: {
    width: 200,
    height: 300,
  },
  video: {
    width: 200,
    height: 270,
    marginBottom: 5,
    marginTop: 5,
  },
});
export default styles;
