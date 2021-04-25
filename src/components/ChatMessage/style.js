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
});
export default styles;
