import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ChatsScreen from '../screens/ChatScreents/ChatsScreen';
const MainTab = createMaterialTopTabNavigator();
function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}
const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="ChatScreen" component={ChatsScreen} />
      <MainTab.Screen name="Status" component={SettingsScreen} />
    </MainTab.Navigator>
  );
};
export default MainTabNavigator;
