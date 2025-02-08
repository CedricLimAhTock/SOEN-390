import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import Constants from "expo-constants";

import "../global.css"
import HomeScreen from './screens/home/HomeScreen';
import CalendarScreen from './screens/calendar/CalendarScreen';
import NavigationScreen from './screens/navigation/NavigationScreen';
import LoginScreen from './screens/login/LoginScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <Auth0Provider domain={process.env.EXPO_PUBLIC_AUTH0_DOMAIN} clientId={process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID} >
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name ="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen options={{headerShown: false}} name="Navigation" component={NavigationScreen} />
        {/* <Stack.Screen name="Navigation" component={NavigationScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </Auth0Provider>
  );
}

