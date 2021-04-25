import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FriendRequest from './FriendRequest';
import SeachFriend from './SeachFriend';
const MainTab = createMaterialTopTabNavigator();
const InviteFriends = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="SeachFriend" component={SeachFriend} />
      <MainTab.Screen name="FriendRequest" component={FriendRequest} />
    </MainTab.Navigator>
  );
};
export default InviteFriends;
