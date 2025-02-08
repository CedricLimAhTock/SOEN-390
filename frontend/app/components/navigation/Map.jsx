import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT, Polygon, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import NavigationIcon from './Icons/NavigationIcon';
import { polygons, SGWLocation, LoyolaLocation} from '../../screens/navigation/navigationConfig';
import MapCard from './MapCard';
import MapSearch from './MapSearch';
import SGWIcon from './Icons/SGWIcon';
import LoyolaIcon from './Icons/LoyolaIcon'
import DirectionsIcon from './Icons/DirectionsIcon';
import MapLocation from './MapLocation';
import MapResults from './MapResults';
import MapViewDirections from 'react-native-maps-directions';


export default function Map() {
  const [searchResult, setSearchResult] = useState([]);
  const [locationData, setLocationData] = useState(SGWLocation);
  const [location, setLocation] = useState(null)
  const [searchText, setSearchText] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const ref = useRef(null);

  const handleSetStart = () => {
    // handle set start logic
  };

  const handleGetDirections = () => {
    // handle get directions logic
  };

  const handleLoyola = () => {
    console.log("aa")
    ref.current.animateToRegion(LoyolaLocation)
  }

  const handleSGW = () => {
    ref.current.animateToRegion(SGWLocation)
  }

  const renderPolygons = polygons.map((building, idx) => {
    return (
        <View key={idx}>
          <Marker
            coordinate={building.point}
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
      
    )
  })

  const traceRouteOnReady = (args) => {
    console.log("ready")
  }

  console.log(process.env.EXPO_PUBLIC_GOOGLE_API_KEY)

  return (
    <View className='opacity-100 bg-red-500' style={styles.container}>
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
          <MapViewDirections
            origin={polygons[0].point}
            destination={polygons[1].point}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
        />
        {renderPolygons}
      </MapView>
      {isSearch && <MapResults searchResult={searchResult} setSearchResult={setSearchResult} isSearch={isSearch} setIsSearch={setIsSearch} searchText={searchText}/>}
      {!isSearch && <MapSearch searchResult={searchResult} setSearchResult={setSearchResult} isSearch={isSearch} setIsSearch={setIsSearch} searchText={searchText} setSearchText={setSearchText} />
      }      
      {!isSearch && <View className="absolute h-full justify-end items-center ">
        <View style={styles.shadow} className='mb-40 rounded-xl bg-white p-4 ml-8'>
          <TouchableHighlight underlayColor={'white'} onPress={handleLoyola} className='mb-4'><LoyolaIcon/></TouchableHighlight>
          <TouchableHighlight underlayColor={'white'} onPress={handleSGW}><SGWIcon/></TouchableHighlight>
        </View>
      </View>}
      {!isSearch && <MapLocation setLocation={setLocation}/>}
      {!isSearch && <View className='absolute w-full bottom-10'>
        <View className='flex flex-row justify-center items-center'>
          <TouchableHighlight style={styles.shadow} className='mr-4 rounded-xl p-4 bg-primary-red'>
            <View className='flex flex-row justify-around items-center'>
              <Text className='color-white mr-4 font-bold'>Set Start</Text>
              <NavigationIcon/>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.shadow} className='rounded-xl p-4 bg-primary-red'>
            <View className='flex flex-row justify-around items-center'>
              <Text className='color-white mr-4 font-bold'>Get Directions</Text>
              <DirectionsIcon/>
            </View>
          </TouchableHighlight>
        </View>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  slideView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  shadow: {
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    position: 'absolute',
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
