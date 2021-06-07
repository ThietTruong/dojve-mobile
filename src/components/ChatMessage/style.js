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
    marginBottom: 10,
    color: '#555555',
  },
  image: {
    width: 130,
    height: 130,
    marginBottom: 5,
    marginTop: 5,
  },
  imgContainer: {
    width: 140,
    height: 150,
    marginLeft: '65%',
  },
  videoContainer: {
    width: 200,
    height: 300,
    marginLeft: '50%',
  },
  video: {
    width: 200,
    height: 280,
    marginBottom: 5,
    marginTop: 5,
  },
});
export default styles;
