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
    color: '#555555',
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 5,
    marginTop: 5,
  },
  imgContainer:{
    width: 90,
    height: 90,
    marginLeft: '72%',
  }
});
export default styles;
