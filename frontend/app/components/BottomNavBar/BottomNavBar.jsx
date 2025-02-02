import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';

export default function BottomNavBar({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <Pressable
      className="bg-red-500"
        title="Go to Caldendar"
        onPress={() => navigation.navigate('Calendar')}
      >
        <Text>Hi</Text>
      </Pressable>
      <Button
        title="Go to Navigation"
        onPress={() => navigation.navigate('Navigation')}
      />
    </View>
  );
}