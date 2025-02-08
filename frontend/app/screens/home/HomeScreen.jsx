import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export default function HomeScreen({ navigation }) {
  const { signOut, getToken } = useAuth();

  const handleLogout = async () => {
    try {
      const token = await getToken();
      console.log("User Token Data:", token);
      await signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Calendar"
        onPress={() => navigation.navigate('Calendar')}
      />
      <Button
        title="Go to Navigation"
        onPress={() => navigation.navigate('Navigation')}
      />
      <Button
        title="Logout"
        onPress={handleLogout}
      />
    </View>
  );
}
