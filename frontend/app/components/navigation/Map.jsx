import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT, Polygon, Callout} from 'react-native-maps';
import NavigationIcon from './Icons/NavigationIcon';
import { buildings, SGWLocation, LoyolaLocation} from '../../screens/navigation/navigationConfig';
import MapCard from './MapCard';
import MapSearch from './MapSearch';
import SGWIcon from './Icons/SGWIcon';
import LoyolaIcon from './Icons/LoyolaIcon'
import DirectionsIcon from './Icons/DirectionsIcon';
import MapLocation from './MapLocation';
import MapResults from './MapResults';


export default function Map() {

  const [locationData, setLocationData] = useState(SGWLocation);
  const [location, setLocation] = useState(null)
  const [searchText, setSearchText] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const slideAnim = useRef(new Animated.Value(300)).current;
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

  const renderPolygons = buildings.map((building, idx) => {
    return (
        <View key={idx}>
          <Marker
            coordinate={building.point}
            image={require("../../../assets/concordia-logo.png")}
          >
            <Callout tooltip={true}>
              <MapCard 
                name={'EV Building'} 
                address={'1515 St. Catherine W'}
                isHandicap={true}
                isMetro={true}
                isInfo={true}
              />
            </Callout>
          </Marker>
          <Polygon
            coordinates={building.location}
            strokeWidth={2}
            strokeColor="#862532"
            fillColor="rgba(134, 37, 50, 0.5)"
          />
        </View>
      
    )
  })

  useEffect(() => {
    if (!isSearch) return;
    console.log("trying to animate")
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 500, 
      useNativeDriver: true, 
    }).start();
  },[isSearch])

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
        {renderPolygons}
      </MapView>
      {isSearch && <Animated.View
        className='h-4/6'
        style={[
          styles.slideView,
          {
            transform: [{ translateY: slideAnim }], // Bind the animation to the translateY property
          },
        ]}
      >
        <MapResults searchText={searchText}/>
      </Animated.View>}
      {!isSearch && <MapSearch isSearch={isSearch} setIsSearch={setIsSearch} searchText={searchText} setSearchText={setSearchText} />
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
    backgroundColor: '#fff',
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
