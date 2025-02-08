import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSSO } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConcordiaLogo from '../../components/ConcordiaLogo';

export default function LoginScreen() {
  return <LoginScreenContent />;
}

function LoginScreenContent() {
  const navigation = useNavigation();
  const logoPosition = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoPosition, {
        toValue: -200,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const { startSSOFlow } = useSSO();
  const fetchSessionData = async (sessionId) => {
    try {
      console.log("Fetching session data for:", sessionId);
      const clerkSecretKey = "sk_test_9ybQ2VKKaRd31fB3qvxk76CtwQGWCTQ8Cm5b3Rmw6X"; // Replace with actual key

      const response = await fetch(`https://api.clerk.dev/v1/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${clerkSecretKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching session data: ${errorText}`);
      }

      const sessionData = await response.json();
      return sessionData;
    } catch (error) {
      console.error("Error fetching session data:", error);
      return null;
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await startSSOFlow({ strategy: 'oauth_google' });
      console.log("Google Sign-In Result:", result);
      const sessionData = await fetchSessionData(result.createdSessionId);
      console.log("Session Data:", sessionData);
        navigation.navigate('Home');
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleGuestLogin = async () => {
    console.log("👤 Guest Login Selected");
    await AsyncStorage.setItem('guestMode', 'true');
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 bg-[#862532] justify-center items-center">
      <Animated.View style={{ transform: [{ translateY: logoPosition }] }}>
        <ConcordiaLogo width={288} height={96} />
      </Animated.View>

      <Animated.View
        className="absolute bottom-0 w-full items-center"
        style={{ opacity: formOpacity }}
      >
        <View className="w-full bg-white rounded-t-[50px] py-32 px-6 items-center shadow-md">
          
          <TouchableOpacity
            onPress={handleGoogleSignIn}
            className="flex-row items-center bg-white rounded-xl py-3 px-6 shadow-md"
          >
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
              className="w-6 h-6 mr-3"
            />
            <Text className="text-black text-lg font-semibold">Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-5" onPress={handleGuestLogin}>
            <Text className="text-[#1A73E8] text-lg font-medium underline">Continue as Guest</Text>
          </TouchableOpacity>

        </View>
      </Animated.View>
    </View>
  );
}
