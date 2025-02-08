import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Button, Dimensions } from 'react-native';

const MapTraceroute = () => {
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').height * 0.3)).current; // Initially set the top position off the screen
  
  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide down to the top of the screen
      duration: 500, // Duration of the animation
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: -Dimensions.get('window').height * 0.3, // Slide back up off the screen
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Button title="Slide In" onPress={slideIn} />
      <Button title="Slide Out" onPress={slideOut} />
      <Animated.View style={[styles.slidingView, { top: slideAnim }]}>
        {/* Your content here */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slidingView: {
    position: 'absolute',
    height: Dimensions.get('window').height * 0.3, // 30% of screen height
    width: '100%', // Full width
    backgroundColor: '#4CAF50', // Background color (customizable)
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapTraceroute;
