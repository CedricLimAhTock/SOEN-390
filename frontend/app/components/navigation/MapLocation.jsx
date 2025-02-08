import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import LocationIcon from "./Icons/LocationIcon"
import * as Location from 'expo-location';

const MapLocation = ({panToMyLocation, setLocation,}) => {

    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    const handleClick = () => {
      getCurrentLocation().then(() => {
        panToMyLocation();
      })

    }

    return (
        <View className='absolute justify-end items-center right-4 h-full'>
            <TouchableOpacity onPress={handleClick} style={styles.shadow} className='mb-40 rounded-3xl bg-white p-2 mr-4'>
                <LocationIcon/>
            </TouchableOpacity>
        </View>
    )

}


const styles = StyleSheet.create({
  shadow: {
    width: '250px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    textAlign: 'center'
  }
});


export default MapLocation;