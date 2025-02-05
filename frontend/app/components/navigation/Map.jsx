import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Polygon} from 'react-native-maps';
import { LoyolaLocation, SGWLocation } from "../../screens/navigation/navigationConfig";
import { useTailwind } from 'tailwind-rn';
import NavigationIcon from './NavigationIcon';
import { HallBuildingOverlay } from '../../screens/navigation/navigationConfig';

export default function Map() {
  const [locationData, setLocationData] = useState(SGWLocation);
  const tailwind = useTailwind();

  const handleSetStart = () => {
    // handle set start logic
  };

  const handleGetDirections = () => {
    // handle get directions logic
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsBuildings={true}
        initialRegion={{
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        mapType="terrain"
        provider={PROVIDER_DEFAULT}
      />
      <Polygon
        coordinates={HallBuildingOverlay}
        strokeWidth={2}
        strokeColor="rgba(134, 37, 50, 0.5)"
        fillColor="rgba(137,37,50,0.2)"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleSetStart()}
        >
          <Text style={styles.loginText}>Set Start</Text>
          <NavigationIcon />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleGetDirections()}
        >
          <Text style={styles.loginText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: 20,
  },
  navButton: {
    flexDirection: 'row', // Align text and icon horizontally
    alignItems: 'center', // Center vertically
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#862532',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    flex: 1,
    marginHorizontal: 10,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    marginRight: 8, // Add some space between the text and icon
  },
});
