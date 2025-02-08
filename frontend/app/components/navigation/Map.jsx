import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, Polygon, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import NavigationIcon from './Icons/NavigationIcon';
import DirectionsIcon from './Icons/DirectionsIcon';
import { polygons, SGWLocation, LoyolaLocation } from '../../screens/navigation/navigationConfig';
import MapCard from './MapCard';
import MapSearch from './MapSearch';
import SGWIcon from './Icons/SGWIcon';
import LoyolaIcon from './Icons/LoyolaIcon';
import MapResults from './MapResults';
import MapLocation from './MapLocation';

export default function Map() {
  const [locationData, setLocationData] = useState(SGWLocation);
  // Whether the user is in "search" mode or not
  const [isSearch, setIsSearch] = useState(false);
  // Which building (if any) has been tapped/clicked
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const [searchText, setSearchText] = useState('');
  const ref = useRef(null);

  const handleSetStart = () => {
    // handle set start logic
  };

  const handleGetDirections = () => {
    // handle get directions logic
  };

  const handleLoyola = () => {
    ref.current?.animateToRegion(LoyolaLocation);
  };

  const handleSGW = () => {
    ref.current?.animateToRegion(SGWLocation);
  };

  // Called when user presses on a building marker
  const handleMarkerPress = (building) => {
    // Hide search-related UI
    setIsSearch(false);
    // Set the building that was selected
    setSelectedBuilding(building);
  };

  const renderPolygons = polygons.map((building, idx) => {
    return (
      <View key={idx}>
        <Marker
          coordinate={building.point}
          // You can decide whether you want onPress on the Marker or the Callout
          onPress={() => handleMarkerPress(building)}
          image={require("../../../assets/concordia-logo.png")}
        >
          <Callout tooltip={true}>
            <MapCard
              name={building.name}
              address={'1515 St. Catherine W'}
              isHandicap={true}
              isMetro={true}
              isInfo={true}
            />
          </Callout>
        </Marker>
        <Polygon
          coordinates={building.boundaries}
          strokeWidth={2}
          strokeColor="#862532"
          fillColor="rgba(134, 37, 50, 0.5)"
        />
      </View>
    );
  });

  const traceRouteOnReady = (args) => {
    console.log("Directions are ready!");
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={ref}
        style={styles.map}
        initialRegion={{
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
        mapType='terrain'
        provider={PROVIDER_DEFAULT}
        
      >
        {/* Example directions */}
        <MapViewDirections
          origin={polygons[0].point}
          destination={polygons[1].point}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
          strokeColor="#6644ff"
          strokeWidth={4}
          onReady={traceRouteOnReady}
        />
        {/* Render your polygons/markers */}
        {renderPolygons}
      </MapView>

      {/* If isSearch is true, show MapResults. Otherwise, maybe show the search bar.
          Also ensure that if a building is selected, we hide these. */}
      {isSearch && <MapResults isSearch={isSearch} setIsSearch={setIsSearch} searchText={searchText} />}
      {/* Show the search bar only if we are not searching results AND no building is selected */}
      {!isSearch && !selectedBuilding && (
        <MapSearch
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}

      {/* Example campus buttons - if you want them to appear even if a building is selected, remove selectedBuilding check */}
      {!isSearch && !selectedBuilding && (
        <View className="absolute h-full justify-end items-center">
          <View style={styles.shadow} className='mb-40 rounded-xl bg-white p-4 ml-8'>
            <TouchableHighlight underlayColor={'white'} onPress={handleLoyola} className='mb-4'>
              <LoyolaIcon />
            </TouchableHighlight>
            <TouchableHighlight underlayColor={'white'} onPress={handleSGW}>
              <SGWIcon />
            </TouchableHighlight>
          </View>
        </View>
      )}

      {/* Example current location marker (optional); show/hide as you wish */}
      {!isSearch && <MapLocation setLocation={() => {}} />}

      {/* Show the "Set Start" / "Get Directions" buttons ONLY if a building is selected */}
      {selectedBuilding && (
        <View className='absolute w-full bottom-10'>
          <View className='flex flex-row justify-center items-center'>
            <TouchableHighlight
              style={styles.shadow}
              className='mr-4 rounded-xl p-4 bg-primary-red'
              onPress={handleSetStart}
            >
              <View className='flex flex-row justify-around items-center'>
                <Text className='color-white mr-4 font-bold'>Set Start</Text>
                <NavigationIcon />
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.shadow}
              className='rounded-xl p-4 bg-primary-red'
              onPress={handleGetDirections}
            >
              <View className='flex flex-row justify-around items-center'>
                <Text className='color-white mr-4 font-bold'>Get Directions</Text>
                <DirectionsIcon />
              </View>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  shadow: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    textAlign: 'center'
  },
});
