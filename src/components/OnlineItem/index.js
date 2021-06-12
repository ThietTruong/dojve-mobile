import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function OnlineItem(props) {
  const { room, userId } = props;
  console.log("co id roi", userId)
  let { _id, lastMessage, members } = room;
  const other = members.filter((user) => user._id !== userId);
  console.log("this is orther", other)

  let online =
    members.find((mem) => mem.status > 0 && mem._id !== userId) !== undefined;
  return (
    <View>
      {online ? <View></View> : <View style={styles.onlineItem}>
        <View style={styles.inforUser}>
          <Image style={styles.avatar} />
          <View style={styles.desUser}>
            <Text style={styles.username} ellipsizeMode='middle' numberOfLines={1} >{other[0].name}</Text>
          </View>
          <View style={styles.invites}>
            <TouchableOpacity
              style={[styles.invitesItem, styles.accept]}
            >
              <MaterialCommunityIcons name="checkbox-blank-circle" size={22} color="#01ad9b" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      }
    </View>
  )
}

export default OnlineItem;
const styles = StyleSheet.create({
  onlineItem: {
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
    alignItems: 'center',
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    overflow: "hidden",
    textTransform: 'capitalize'
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
  rejectText: {
    color: '#151515',
  },
});
