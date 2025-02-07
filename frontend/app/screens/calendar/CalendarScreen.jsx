import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from 'react-native-vector-icons'; // For icons

export default function CalendarScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);

  // Google API issues no need for current sprint
  // useEffect(() => {
  //   fetch('http://localhost:3000/api/calendar')
  //     .then(response => response.json())
  //     .then(data => setEvents(data))
  //     .catch(err => console.error('Error fetching events:', err));
  // }, []);

  return (
    <View className="flex-1 bg-primary-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-primary-text text-2xl font-bold">January</Text>
        <Text className="text-primary-accent text-xl">27</Text>
      </View>

      {/* Calendar */}
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

      {/* Display Events */}
      {/* Commented out since we are not fetching nothing from api */}
      {/* <View className="px-4 mt-4">
        <Text className="text-primary-text font-semibold">Upcoming Events:</Text>
        {events.map((event, index) => (
          <View key={index} className="flex-row items-center justify-between mt-2 p-2 bg-secondary-bg rounded-lg shadow-sm">
            <Text className="text-primary-text">{event.summary}</Text>
            <Ionicons name="calendar" size={20} color="#E6863C" />
          </View>
        ))}
      </View> */}

      {/* Button */}
      <View className="absolute bottom-4 left-0 right-0 mx-4">
        <Button
          title="Get Directions to my Next Class"
          onPress={() => navigation.navigate('Home')}
          color="#862532"
        />
      </View>
    </View>
  );
}
