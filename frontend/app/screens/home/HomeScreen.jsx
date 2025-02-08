import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { useAppSettings } from '../../TextSizeContext';
import { useTextSize } from '../../TextSizeContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { colorBlindMode } = useAppSettings();
  const blinder = require('color-blind');
  const { textSize, setTextSize } = useTextSize(); // Get global text size from context

  // Apply theme colors based on selected mode
  const getThemeColors = () => {
    switch (colorBlindMode) {
      case 'deuteranomaly':
        return { backgroundColor: blinder.deuteranomaly("#7c2933"), textColor: '#FFF' };
      case 'protanomaly':
        return { backgroundColor: blinder.protanomaly("#7c2933"), textColor: '#FFF' };
      case 'tritanomaly':
        return { backgroundColor: blinder.tritanomaly("#7c2933"), textColor: '#FFF' };
      default:
        return { backgroundColor: '#7c2933', textColor: '#FFF' };
    }
  };

  const theme = getThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* Apply global text color and size */}
      <Text style={[styles.text, { color: theme.textColor, fontSize: 36 }]}>Home Screen</Text>

      {/* Replace Button with TouchableOpacity to allow text styling */}
      <TouchableOpacity style={[styles.button, { borderColor: theme.textColor }]} onPress={() => navigation.navigate('Calendar')}>
        <Text style={[styles.buttonText, { color: theme.textColor, fontSize: textSize }]}>Go to Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { borderColor: theme.textColor }]} onPress={() => navigation.navigate('Navigation')}>
        <Text style={[styles.buttonText, { color: theme.textColor, fontSize: textSize }]}>Go to Navigation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { borderColor: theme.textColor }]} onPress={() => navigation.navigate('Settings')}>
        <Text style={[styles.buttonText, { color: theme.textColor, fontSize: textSize }]}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});