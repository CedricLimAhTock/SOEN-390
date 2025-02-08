import React from 'react';
import { View, Text, Button } from 'react-native';
import Map from '../../components/navigation/Map';

export default function NavigationScreen({ navigation }) {
  return (
    <View className='h-full opacity-100' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Map/>
    </View>
  );
}
