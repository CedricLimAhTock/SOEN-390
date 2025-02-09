import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import StartIcon from './Icons/StartIcon';

const MapTracerouteBottom = ({isRoute, setIsRoute, end,start, panToStart,closeTraceroute, setCloseTraceroute }) => {
  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(new Animated.Value(screenHeight)).current; // Start from off-screen (bottom)

  // Function to slide the component up
  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight * 0.9, // 10% of the screen visible
      duration: 1000, // Duration of the animation
      useNativeDriver: false, 
    }).start();
  };

  // Function to slide the component out (downwards)
  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight, // Slide back down off-screen
      duration: 500,
      useNativeDriver: false, 
    }).start();
  };

  // Slide up when the component mounts
  useEffect(() => {
    slideUp(); 
  }, [end, start]);

  useEffect(() => {

  },[isRoute])

  // Slide out when closeTraceroute is set to true
  useEffect(() => {
    if (closeTraceroute) {
      slideOut();
    }
  }, [closeTraceroute]);

  const handleStartTraceroute = () => {
    console.log("Start traceroute clicked");
    panToStart();
  };

  return (
    <Animated.View style={[styles.slidingView, { top: slideAnim }]}>
      <View className='w-4/6 flex flex-row justify-around'>
        <View className='flex flex-row justify-around items-center'>
          <Text className='color-green-500 font-medium mr-2'>30 min</Text>
          <Text className='font-medium'>(20.0 km)</Text>
        </View>
        <TouchableOpacity onPress={handleStartTraceroute} className='bg-primary-red p-3 rounded-3xl pr-4 pl-4 flex flex-row justify-around items-center'>
          <StartIcon />
          <Text className='ml-2 color-selected text-lg'>Start</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slidingView: {
    position: 'absolute',
    height: '10%', // 10% of the screen height
    width: '100%', // Full width
    backgroundColor: 'white', // Custom background color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
});

export default MapTracerouteBottom;
