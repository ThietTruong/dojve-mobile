import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ItemRequest = ({inforRequest, acceptRequest}) => {
  console.log('infor', inforRequest);
  return (
    <View style={styles.inviteFriends}>
      <View style={styles.inforUser}>
        <Image style={styles.avatar} />
        <View style={styles.desUser}>
          <View>
            <Text style={styles.username}>{inforRequest.item.name}</Text>
          </View>
          <View style={styles.invites}>
            <TouchableOpacity
              onPress={() => acceptRequest(inforRequest.item._id)}
              style={[styles.invitesItem, styles.accept]}>
              <AntDesign name="checkcircleo" size={22} color="#fff" />
              <Text style={styles.invitesText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.invitesItem, styles.reject]}>
              <AntDesign name="closecircleo" size={22} color="#151515" />
              <Text style={[styles.invitesText, styles.rejectText]}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ItemRequest;
const styles = StyleSheet.create({
  inviteFriends: {
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
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: '#01ad9b',
  },
  desUser: {
    justifyContent: 'space-around',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 24,
  },

  invites: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  },
  reject: {
    backgroundColor: '#E8EAEA',
  },
  rejectText: {
    color: '#151515',
  },
});
