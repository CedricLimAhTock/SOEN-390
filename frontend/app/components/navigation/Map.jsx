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
import MapTraceroute from './MapTraceroute';
import * as Location from 'expo-location';
import MapTracerouteBottom from './MapTracerouteBottom';

export default function Map() {
  const [searchResult, setSearchResult] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [locationData, setLocationData] = useState(SGWLocation);
  const [isSearch, setIsSearch] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [start, setStart] = useState(); // start lat lng of traceroute
  const [end, setEnd] = useState(); // destination lt lng of traceroute
  const [location, setLocation] = useState(null); // current user location
  const [errorMsg, setErrorMsg] = useState(null); // error message when getting location
  const [searchText, setSearchText] = useState(''); // textinput value
  const [closeTraceroute, setCloseTraceroute] = useState(false); // bool to hide traceroute
  const [startPosition, setStartPosition] = useState(''); // name of start position for traceroute
  const [destinationPosition, setDestinationPosition] = useState(''); // name of destination position for traceroute

  const ref = useRef(null);

  const handleSetStart = () => {
    setStart(selectedBuilding.position)
    setDestinationPosition(selectedBuilding.name)
  };

  const handleGetDirections = () => {
    setIsSearch(true);
    setEnd(selectedBuilding.point);
    setDestinationPosition(selectedBuilding.name);
    setStartPosition('Your Location');
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
    setIsSelected(true);
  };

  const panToMyLocation = () => {
    ref.current?.animateToRegion(location.coords)
  }

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setStart(location.coords)
    }
    getCurrentLocation();
  }, [end]);


  const renderPolygons = polygons.map((building, idx) => {
    return (
      <View key={idx}>
        {
          end == null &&
          <Marker
          coordinate={building.point}
          // You can decide whether you want onPress on the Marker or the Callout
          onPress={() => handleMarkerPress(building)}
          image={require("../../../assets/concordia-logo.png")}
          >
          <Callout tooltip={true}>
            <MapCard
              name={building.name}
              address={building.address}
              isHandicap={true}
              isMetro={true}
              isInfo={true}
            />
          </Callout>
        </Marker>}
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

  const handleMapPress = () => {
  }

  const panToStart = () => {
    if (start == null) return;
    ref.current?.animateToRegion(start);
  }

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
        onPress={handleMapPress}
        
      > 
        <Marker coordinate={start} image={require("../../../assets/my_location.png")}/>
        {start != null && end != null ? (<Marker coordinate={end}/>) : null}
        {start != null && end != null ? (<Marker coordinate={start}/>) : null}
        {start != null && end != null ? (<MapViewDirections
          origin={start}
          destination={end}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
          strokeColor="#862532"
          strokeWidth={6}
          onReady={traceRouteOnReady}
        />): null}
        {renderPolygons}
      </MapView>
      {console.log("hh")}
      {console.log(start)}
      {console.log("aa")}
      {console.log(end)}
      {start != null && end != null ? (<MapTraceroute end={end} start={start} setStart={setStart} setEnd={setEnd} startPosition={startPosition} destinationPosition={destinationPosition} setStartPosition={setStartPosition} setDestinationPosition={setDestinationPosition} setIsSearch={setIsSearch} closeTraceroute={closeTraceroute} setCloseTraceroute={setCloseTraceroute}/>) : null}
      {start != null && end != null ? (<MapTracerouteBottom panToStart={panToStart} end={end} start={start} closeTraceroute={closeTraceroute} setCloseTraceroute={setCloseTraceroute} />) : null}
      {/* If isSearch is true, show MapResults. Otherwise, maybe show the search bar.
          Also ensure that if a building is selected, we hide these. */}
      {isSearch && end == null && <MapResults
        setCloseTraceroute={setCloseTraceroute}
        setStartPosition={setStartPosition}
        setDestinationPosition={setDestinationPosition}
        start={start}
        end={end}
        setStart={setStart}
        setEnd={setEnd}
        setSearchText={setSearchText}
        searchResult={searchResult} setSearchResult={setSearchResult}
        isSearch={isSearch} setIsSearch={setIsSearch} searchText={searchText} />}
      {/* Show the search bar only if we are not searching results AND no building is selected */}
      {!isSearch && (
        <MapSearch
          searchResult={searchResult} 
          setSearchResult={setSearchResult}
          isSearch={isSearch}
          setIsSearch={setIsSearch}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}

      {/* Example campus buttons - if you want them to appear even if a building is selected, remove selectedBuilding check */}
      {!isSearch && (
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
      {!isSearch && <MapLocation panToMyLocation={panToMyLocation} setLocation={() => {}} />}

      {/* Show the "Set Start" / "Get Directions" buttons ONLY if a building is selected */}
      {selectedBuilding && !isSearch && (
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
