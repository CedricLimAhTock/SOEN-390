import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Button, Dimensions, TouchableOpacity, Text } from 'react-native';
import StartIcon from './Icons/StartIcon';

const MapTracerouteBottom = () => {
  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(new Animated.Value(screenHeight)).current; // Start from off-screen (bottom)

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight * 0.9, // Slide to 80% down (leaving 20% visible)
      duration: 1000, // Duration of the animation
      useNativeDriver: false, // `top` cannot be animated with useNativeDriver
    }).start();
  };

  useEffect(() => {
    slideUp(); // Automatically slide up when the component mounts
  }, []);

  return (
    <Animated.View style={[styles.slidingView, { top: slideAnim }]}>
      {/* Your content inside the sliding view */}
      <View className='w-4/6 flex flex-row justify-around'>
        <View className='flex flex-row justify-around items-center'>
            <Text className='color-green-500 font-medium mr-2'>30 min</Text>
            <Text className='font-medium'>(20.0 km)</Text>
        </View>
        <TouchableOpacity className='bg-primary-red p-3 rounded-3xl pr-4 pl-4 flex flex-row justify-around items-center'>
            <StartIcon/>
            <Text className='ml-2 color-selected text-lg'>Start</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slidingView: {
    position: 'absolute',
    height: '10%', // 20% of the screen height
    width: '100%', // Full width
    backgroundColor: 'white', // Custom background color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
});

export default MapTracerouteBottom;
