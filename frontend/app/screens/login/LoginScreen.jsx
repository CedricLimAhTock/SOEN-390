import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function LoginScreen()  {
  
  return (
    <View className="flex-1 bg-[#862532] justify-center items-center">
      <View className="w-full h-3/4 justify-center items-center">
        <Image
          source={require('../../../assets/concordia-logo.png')}
          className="w-72 h-24 mb-80"
        />
      </View>

      {/* Bottom section with white background */}
      <View className="w-full bg-white rounded-t-3xl p-6 items-center shadow-lg">
        <TouchableOpacity className="flex-row items-center bg-white shadow-md rounded-md px-4 py-2 mb-4">
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
            className="w-6 h-6 mr-2"
          />
          <Text className="text-black text-base font-semibold">Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
