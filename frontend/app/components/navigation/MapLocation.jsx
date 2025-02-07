import { Text, View, StyleSheet } from "react-native";
import LocationIcon from "./Icons/LocationIcon"

const MapLocation = ({setLocation}) => {
    return (
        <View className='absolute justify-end items-center right-4 h-full'>
            <View style={styles.shadow} className='mb-40 rounded-3xl bg-white p-2 mr-4'>
                <LocationIcon/>
            </View>
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