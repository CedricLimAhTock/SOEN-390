import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_DEFAULT, PolygonF,Polygon, Overlay, Circle} from 'react-native-maps';
import { BAnnexOverlay, CLAnnexOverlay, EVOverlay, FaubourgOverlay, JMSBOverlay, LoyolaLocation, SGWLocation } from "../../screens/navigation/navigationConfig";
import { useTailwind } from 'tailwind-rn';
import NavigationIcon from './NavigationIcon';
import { buildings,HallBuildingOverlay, LibraryOverlay, CIAnnexOverlay } from '../../screens/navigation/navigationConfig';
import MapCard from './MapCard';

export default function Map() {

  const [locationData, setLocationData] = useState(SGWLocation);
  const [isVisible, setIsVisible] = useState(false);
  const [cardPos, setCardPos] = useState({});

  const mapRef = useRef();

  const tailwind = useTailwind();

  const handleSetStart = () => {
    // handle set start logic
  };

  const handleGetDirections = () => {
    // handle get directions logic
  };
  
  const handleHallBuilding = () => {

  };

  const handleOverlayClick = async (position) => {
    const point = await mapRef.current.pointForCoordinate(position)
    setCardPos({
      x: point.latitude,
      y: point.longitude
    });

    setIsVisible(true);
  }

  const renderPolygons = (buildings) => {
    buildings.map((building, idx) => {
      <Polygon
        coordinates={building.location}
        strokeWidth={2}
        onPress={handleOverlayClick(building.point)}
        strokeColor="#862532"
        fillColor="rgba(134, 37, 50, 0.5)"
      />
    })
  }

  return (
    <View style={styles.container}>
      <MapView
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
        {buildings.map((building, idx) => {
      <React.Fragment key={idx}><Polygon
        coordinates={building.location}
        strokeWidth={2}
        onPress={handleOverlayClick(building.point)}
        strokeColor="#862532"
        fillColor="rgba(134, 37, 50, 0.5)"
      /></React.Fragment>
    })}
       <Polygon
        coordinates={buildings[0].location}
        strokeWidth={2}
        onPress={handleOverlayClick}
        strokeColor="#862532"
        fillColor="rgba(134, 37, 50, 0.5)"
      /> {/* 
      { isVisible && 
        <View style={[styles.cardContainer, {top: cardPos.y - 50, left: cardPos.x - 150}]}>
          <MapCard title="Hall Building" content="hall building is there"/>
        </View>

      }
      <Polygon
        coordinates={buildings[1].location}
        strokeWidth={2}
        strokeColor="#862532"
        fillColor="rgba(134, 37, 50, 0.5)"
      /> */}
      {/*
      <Polygon
        coordinates={BAnnexOverlay}
        strokeWidth={2}
        strokeColor="#862532"
        fillColor="rgba(134, 37, 50, 0.5)"
      />
      <Polygon
        coordinates={CIAnnexOverlay}
        strokeWidth={2}
        strokeColor="#862532"
        fillColor="rgba(134, 37, 50, 0.5)"
      />
      <Polygon
        coordinates={EVOverlay}
        strokeWidth={2}
        strokeColor="#862532"
        fillColor="rgba(134, 37, 50, 0.5)"
      />
      <Polygon
        coordinates={FaubourgOverlay}
        strokeWidth={2}
        strokeColor="#862532"
        fillColor="rgba(134, 37, 50, 0.5)"
      />
      <Polygon
        coordinates={CLAnnexOverlay}
        strokeWidth={2}
        strokeColor="#862532"
        fillColor="rgba(134, 37, 50, 0.5)"
      />
      <Polygon
        coordinates={JMSBOverlay}
        strokeWidth={2}
        strokeColor="#862532"
        fillColor="rgba(134, 37, 50, 0.5)"
      /> */}

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
      </MapView>
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
