import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons'; // For icons

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);

  // Google API issues no need for current sprint
  // Here we would put the go fetch calendar with google api

  return (
    <View className="flex-1 bg-primary-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-primary-text text-2xl font-bold">January</Text>
        <Text className="text-primary-accent text-xl">27</Text>
      </View>

      {/* Calendar */}
      {/*
          Here we use the react-native-calendars to display calendar and style with tailwing
          */}
      <Calendar
        current={'2025-01-01'}
        minDate={'2025-01-01'}
        maxDate={'2025-12-31'}
        monthFormat={'yyyy MM'}
        onDayPress={(day) => console.log('selected day', day)}
        theme={{
          selectedDayBackgroundColor: '#E6863C',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#862532',
          arrowColor: '#862532',
        }}
      />


      {/* Button */}
      <View className="absolute bottom-4 left-0 right-0 mx-4">
        <Button
          title="Get Directions to My Next Class"
          onPress={() => alert("Directions are coming soon!")}
          color="#862532"
        />
      </View>
    </View>
  );
}
