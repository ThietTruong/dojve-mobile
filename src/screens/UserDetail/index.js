import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import LogOut from '../../components/LogOut';
import Notifications from '../Notifications';
import InviteFriends from '../InviteFriends';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const UserDetail = ({navigation, route}) => {
  const handlePressInviteFriends = () => {
    navigation.navigate('InviteFriends');
  };
  return (
    <View style={styles.container}>
      <View style={styles.inforUser}>
        <Image style={styles.avatar} />
        <View style={styles.desUser}>
          <Text style={styles.username}>{route.params.userName}</Text>
          <Text style={styles.bio}>At work</Text>
        </View>
      </View>
      <View style={styles.mainContent}>
        <TouchableOpacity>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.item}>
            <AntDesign
              name="contacts"
              size={34}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.itemText}>Account</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.item}>
            <Ionicons
              name="notifications-outline"
              size={34}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.itemText}>Notifications</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressInviteFriends}>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.item}>
            <FontAwesome5
              name="user-friends"
              size={34}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.itemText}>Invite friends</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.item}>
            <AntDesign
              name="questioncircleo"
              size={34}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.itemText}>About and help</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.logOut}>
        <LogOut />
      </View>
    </View>
  );
};
export default UserDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    marginVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#EEF8F3',
  },
  mainContent: {
    flex: 9,
    width: '100%',
    paddingHorizontal: 20,
  },
  inforUser: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#08d4c4',
    padding: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
    backgroundColor: '#01ad9b',
  },
  desUser: {
    justifyContent: 'space-around',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  bio: {
    fontSize: 18,
    color: 'grey',
  },
  logOut: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  item: {
    height: 60,
    flexDirection: 'row',
    borderColor: '#EEF8F3',
    borderWidth: 1,
    marginTop: 25,
    borderRadius: 30,
    alignItems: 'center',
  },
  icon: {
    padding: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});
