import React, { useEffect, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, Animated, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConcordiaLogo from "../../components/ConcordiaLogo";
import * as WebBrowser from "expo-web-browser";

export default function LoginScreen() {
  return <LoginScreenContent />;
}

function LoginScreenContent() {
  const navigation = useNavigation();
  const logoPosition = useRef(new Animated.Value(0)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;

  // Warm-up WebBrowser for OAuth login
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  // Logo animation effect
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

  // OAuth login setup for Google
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
    extraParams: {
      scope: "openid profile email https://www.googleapis.com/auth/calendar.readonly",
    },
  });

  // Function to handle Google Sign-In
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log("Created Session ID:", createdSessionId);

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.error("Error signing in with OAuth:", error);
    }
  }, []);

  // Get user authentication state from Clerk
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  console.log("User Signed In:", isSignedIn);

  // Store only name, email, and image in AsyncStorage
  useEffect(() => {
    const storeUserData = async () => {
      if (isSignedIn && user) {
        const userData = {
          fullName: user.fullName || "N/A",
          email: user.primaryEmailAddress?.emailAddress || "N/A",
          imageUrl: user.imageUrl || null,
        };

        try {
          await AsyncStorage.setItem("userData", JSON.stringify(userData));
          console.log("Stored User Data:\n", JSON.stringify(userData, null, 2));
          navigation.navigate("Home");
        } catch (error) {
          console.error("Error storing user data:", error);
        }
      }
    };

    storeUserData();
  }, [isSignedIn, user]);

  // Guest login function
  const handleGuestLogin = async () => {
    console.log("Guest Login Selected");
    try {
      await AsyncStorage.setItem("guestMode", "true");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error setting guest mode:", error);
    }
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
          {/* Google Sign-In Button */}
          <TouchableOpacity
            onPress={handleGoogleSignIn}
            className="flex-row items-center bg-white rounded-xl py-3 px-6 shadow-md"
          >
            <Image
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
              className="w-6 h-6 mr-3"
            />
            <Text className="text-black text-lg font-semibold">Continue with Google</Text>
          </TouchableOpacity>

          {/* Guest Login Button */}
          <TouchableOpacity className="mt-5" onPress={handleGuestLogin}>
            <Text className="text-[#1A73E8] text-lg font-medium underline">Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
