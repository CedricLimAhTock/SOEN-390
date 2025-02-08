import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppSettingsProvider } from './TextSizeContext';
import { TextSizeProvider } from './TextSizeContext';

import "../global.css"
import HomeScreen from './screens/home/HomeScreen';
import CalendarScreen from './screens/calendar/CalendarScreen';
import NavigationScreen from './screens/navigation/NavigationScreen';
import SettingsScreen from './screens/settings/settingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppSettingsProvider>
    <TextSizeProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </TextSizeProvider>
    </AppSettingsProvider>
  );
}
