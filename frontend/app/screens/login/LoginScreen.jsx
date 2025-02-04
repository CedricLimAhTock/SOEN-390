import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import ConcordiaLogo from '../../components/ConcordiaLogo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();
  const logoPosition = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoPosition, {
        toValue: -200,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  });

  const handleGoogleSignIn = async () => {
    promptAsync();
  };


  const handleGuestLogin = () => {
    console.log("Guest Login Clicked");
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
