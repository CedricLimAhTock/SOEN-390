import React from 'react';
import { View, Text, Button } from 'react-native';
import BusSchedule from '../../components/BusSchedule';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <BusSchedule />
      <Button
        title="Go to Caldendar"
        onPress={() => navigation.navigate('Calendar')}
      />
      <Button
        title="Go to Navigation"
        onPress={() => navigation.navigate('Navigation')}
      />
       <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}