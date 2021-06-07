import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function InviteItem({ handleInvite, roomId, friends }) {
  return (
    <View style={styles.InviteItem}>
      <View style={styles.inforUser}>
        <Image style={styles.avatar} />
        <View style={styles.desUser}>
          <Text style={styles.username}>Hehe</Text>
        </View>
        <View style={styles.invites}>
          <TouchableOpacity
            style={[styles.invitesItem, styles.accept]}
          >
            <AntDesign name="checkcircleo" size={22} color="#fff" />
            <Text style={styles.invitesText}>Invite</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default InviteItem;
const styles = StyleSheet.create({
  InviteItem: {
    height: 85,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: '#08d4c4',
    marginTop: 20,
  },
  inforUser: {
    flex: 1,
    height: 90,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: '#01ad9b',
  },
  desUser: {
    // justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 24,
  },

  invites: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  invitesItem: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  invitesText: {
    textAlign: 'center',
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  accept: {
    backgroundColor: '#08d4c4',
    marginRight: 10,
    width: 130,
    paddingVertical: 10,
  },
  reject: {
    backgroundColor: '#E8EAEA',
  },
  rejectText: {
    color: '#151515',
  },
});
