import React from 'react';
import { View, Text, Button } from 'react-native';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import HomeHeader from '../../components/HomeHeader/HomeHeader';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  }}>
      <HomeHeader/>

      <BottomNavBar/>
    </View>
  );
}