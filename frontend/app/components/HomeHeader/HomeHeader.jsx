import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';

export default function HomeHeader() {
  return (
    <View className="bg-red-500 rounded-xl" style={{height:194,   alignItems: 'center', flexDirection: 'row', backgroundColor:'#862532'}}>
<View className="flex pl-6 pt-5">
<Text className="text-white font-bold text-3xl">
    Welcome Back
</Text>
<Text className="text-white font-bold text-2xl">
    Joe Smith
</Text>
</View>
    </View>
  );
}