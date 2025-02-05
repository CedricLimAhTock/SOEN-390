import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Go to Caldendar"
        onPress={() => navigation.navigate('Calendar')}
      />
      <Button
        title="Go to Navigation"
        onPress={() => navigation.navigate('Navigation')}
      />
    </View>
  );
}