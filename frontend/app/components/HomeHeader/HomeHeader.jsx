import React from "react";
import { View, Text, Button, Pressable } from "react-native";

export default function HomeHeader() {
  return (
    <View
      style={{
        height: 194,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#862532",
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <View className="flex pl-6 pt-5">
        <Text className="text-white font-bold text-3xl">Welcome Back</Text>
        <Text className="text-white font-bold text-2xl">Joe Smith</Text>
      </View>
    </View>
  );
}
