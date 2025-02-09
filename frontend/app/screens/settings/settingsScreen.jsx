/* npm install @react-native-community/slider
 npx expo install expo-image-picker
 npm install react-native-color-matrix-image-filters
 npx expo install react-native-color-matrix-image-filters 
 npm install color-blind
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Switch,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Slider from "@react-native-community/slider";
import * as ImagePicker from "expo-image-picker";
import {
  ColorMatrix,
  concatColorMatrices,
  colorMatrices,
} from "react-native-color-matrix-image-filters";
import { useAppSettings } from "../../TextSizeContext";
import { useTextSize } from "../../TextSizeContext";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SettingsScreen() {
  const [isWheelchairAccessEnabled, setWheelchairAccessEnabled] =
    useState(false);
  const [tempProfileImage, setTempProfileImage] = useState(profileImage);

  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const parsedUser = JSON.parse(storedUserData);
          console.log("Loaded User Data:", parsedUser);

          // Set the username or full name
          setUserName(parsedUser.fullName || "Guest");
          setProfileImage(parsedUser.imageUrl || null);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  const { colorBlindMode, setColorBlindMode } = useAppSettings(); // Global color mode
  const [isColorBlindModeEnabled, setColorBlindModeEnabled] = useState(
    !!colorBlindMode
  );

  const { textSize, setTextSize, profileImage, setProfileImage } =
    useTextSize(); // Get global text size from context
  const [tempSize, setTempSize] = useState(textSize); // Local state for preview
  const blinder = require("color-blind");

  // 🔹 Function to transform colors dynamically based on color blindness mode
  const transformColor = (color) => {
    if (!color || !colorBlindMode) return color; // Return original if undefined or no mode selected
    return blinder[colorBlindMode] ? blinder[colorBlindMode](color) : color;
  };

  // 🔹 Apply dynamic styles safely by checking if each style exists
  const dynamicStyles = {
    container: {
      ...styles.container,
      backgroundColor: transformColor(
        styles.container?.backgroundColor || "#EDEDED"
      ),
    },
    topSection: {
      ...styles.topSection,
      backgroundColor: transformColor(
        styles.topSection?.backgroundColor || "#7c2933"
      ),
    },
    bottomSection: {
      ...styles.bottomSection,
      backgroundColor: transformColor(
        styles.bottomSection?.backgroundColor || "#EDEDED"
      ),
    },
    text: {
      ...styles.text,
      color: transformColor(styles.text?.color || "#FFF"),
    },
    buttonText: {
      ...styles.buttonText,
      color: transformColor(styles.buttonText?.color || "#FFF"),
    },
    settingTitle: {
      ...styles.settingTitle,
      color: transformColor(styles.settingTitle?.color || "#000"),
    },
    infoText: {
      ...styles.infoText,
      color: transformColor(styles.infoText?.color || "#000"),
    },
  };

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      setTempProfileImage(result.assets[0].uri); // Store in temporary state
    }
  };

  // Function to apply changes
  const applyChanges = () => {
    setTextSize(tempSize); // Save text size globally
    setProfileImage(tempProfileImage); // Save profile image globally
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#7c2933" }}>
      <ScrollView style={dynamicStyles.container}>
        <View style={dynamicStyles.topSection}>
          {/* Top Section - 75% of Screen */}

          {/* Profile Picture Section */}
          <TouchableOpacity onPress={pickImage} style={styles.profileContainer}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../../assets/default-avatar.png")
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.userName}>{userName}</Text>
        </View>

        <View style={dynamicStyles.bottomSection}>
          {/* Personal Information */}

          {/* Contact Information */}
          <View style={styles.infoSection}>
            <Text style={styles.header}>Accessibility Settings</Text>

            {/* Accessibility Settings */}
            <View style={styles.settingItem}>
              <Text style={dynamicStyles.settingTitle}>Wheelchair Access</Text>
              <Switch
                value={isWheelchairAccessEnabled}
                onValueChange={setWheelchairAccessEnabled}
              />
            </View>
            <Text style={styles.description}>
              Enable features optimized for wheelchair users / Offer directions
              that use elevators/escalators for persons with limited mobility.
            </Text>

            {/* Toggle for Color Blind Mode */}
            <View style={styles.settingItem}>
              <Text style={[dynamicStyles.settingTitle]}>
                Color Vision Deficient
              </Text>
              <Switch
                value={isColorBlindModeEnabled}
                onValueChange={(value) => {
                  setColorBlindModeEnabled(value);
                  if (!value) setColorBlindMode(null); // Disable mode
                }}
              />
            </View>

            {/* Color Blindness Type Selection */}
            {isColorBlindModeEnabled && (
              <View style={styles.radioGroup}>
                {["Deuteranomaly", "Protanomaly", "Tritanomaly"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={styles.radioButton}
                    onPress={() => setColorBlindMode(type.toLowerCase())}
                  >
                    <View style={styles.radioCircle}>
                      {colorBlindMode === type.toLowerCase() && (
                        <View style={styles.selectedRadio} />
                      )}
                    </View>
                    <Text style={[styles.radioText]}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={{ height: 30 }}></View>

            {/* Text Size Adjustment */}
            <Text style={[styles.previewText, { fontSize: tempSize }]}>
              Text Font Size
            </Text>
            <Slider
              style={dynamicStyles.slider}
              minimumValue={12}
              maximumValue={24}
              step={1}
              value={tempSize}
              onValueChange={setTempSize}
            />
            <Text style={styles.description}>
              Adjust the text size to improve readability.
            </Text>

            {/* Apply Button */}
            <Button title="Apply Changes" onPress={applyChanges} />
          </View>
        </View>
      </ScrollView>
      <BottomNavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  userName: {
    fontSize: 32,
    fontWeight: "normal",
    color: "white",
    marginBottom: 60,
    fontWeight: "bold",

  },
  profileContainer: {
    alignItems: "center",
    top: 20,
    marginBottom: 60,
  },
  topSection: {
    flex: 3, // 75% of the screen height
    width: "111%", // Ensures full width
    backgroundColor: "#7c2933",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    top: -20, // Starts at the top
    left: -20, // Ensures no unexpected margin
    height: "100%",
  },
  bottomSection: {
    flex: 1, // Takes 25% of screen
    backgroundColor: "#EDEDED",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100, // Circular image
    borderWidth: 2,
    borderColor: "white",
    marginTop: 50,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 0,
  },
  textPreview: {
    textAlign: "center",
    color: "black",
    marginTop: 10,
  },
  slider: {
    width: "100%",
    height: 40,
    marginTop: 10,
  },
  description: {
    color: "#666",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  subSectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 5,
  },
  infoSection: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: -70, // Starts at the top
  },
  infoText: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  radioGroup: {
    marginTop: 15,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRadio: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#8B0000", // Dark red selected color
  },
  radioText: {
    fontSize: 16,
    color: "black",
  },
});
