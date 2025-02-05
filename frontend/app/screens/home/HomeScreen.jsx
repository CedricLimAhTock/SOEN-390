import React from "react";
import { View, Text, Button } from "react-native";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import HomeCard from "../../components/HomeCard/HomeCard";
import MapPic from "../../../assets/MapScreenshot.png";
import CalendarPic from "../../../assets/CalendarScreenshot.png";
export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <HomeHeader />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 20,
          paddingTop: 120,
        }}
      >
        <HomeCard image={MapPic} text="Find your next class" />
        <HomeCard image={CalendarPic} text="Access your calendar" />
      </View>
      <BottomNavBar />
    </View>
  );
}
