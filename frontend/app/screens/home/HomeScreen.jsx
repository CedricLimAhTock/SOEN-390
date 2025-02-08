import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const { signOut } = useAuth();
  const [username, setUsername] = useState("");

  // Fetch user data from AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const parsedUser = JSON.parse(storedUserData);
          console.log("Loaded User Data:", parsedUser);
          
          // Set the username or full name
          setUsername(parsedUser.fullName || "User");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  // Handle logout and clear storage
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("googleSessionId");
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("guestMode"); // Clear guest mode if used
      console.log("🗑️ Cleared stored session data.");

      await signOut();
      console.log("Successfully signed out!");

      // Reset navigation history and go back to Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Hello, {username}
      </Text>

      <Button title="Go to Calendar" onPress={() => navigation.navigate("Calendar")} />
      <Button title="Go to Navigation" onPress={() => navigation.navigate("Navigation")} />
      <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
}
