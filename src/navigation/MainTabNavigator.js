import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatsScreen from '../screens/ChatScreents/ChatsScreen';
import Status from '../screens/Status';
const MainTab = createMaterialTopTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Chat" component={ChatsScreen} />
      <MainTab.Screen name="Status" component={Status} />
    </MainTab.Navigator>
  );
};
export default MainTabNavigator;
