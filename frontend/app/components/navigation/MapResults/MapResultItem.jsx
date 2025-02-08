import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, TouchableHighlight, PanResponder} from 'react-native';
import WheelChairIcon from '../Icons/WheelChairIcon';
import BikeIcon from '../Icons/BikeIcon';
import MetroIcon from '../Icons/MetroIcon';
import InformationIcon from '../Icons/InformationIcon';
import NavigationIcon from '../Icons/NavigationIcon';
import DirectionsIcon from '../Icons/DirectionsIcon';
import { useRef } from 'react';

const MapResultItem = ({building, start, setStart, end, setEnd,  name, address,isHandicap, isBike, isMetro, isInfo}) => {

    const handleGetDirections = () => {
        setEnd(building.point);
    }

    return (
        <View style={styles.shadow} className='w-full  mb-4 bg-secondary-bg p-4 rounded-lg flex flex-col justify-center items-center'>
            <View className='flex justify-start left-0 flex-row mb-4'>
                <View className='mr-4'>
                    <Text className='font-bold'>{name}</Text>
                </View>
                <View className='flex flex-row items-center justify-around'>
                    <WheelChairIcon/>
                    <BikeIcon/>
                    <MetroIcon/>
                    <InformationIcon/>
                </View>

            </View>
            <View className='mb-4 flex flex-row'>
                <NavigationIcon/>
                <Text className='color-slate-400 text-xs'>{address}</Text>
            </View>
            <View className='flex flex-row justify-around items-center'>
                <TouchableHighlight style={styles.shadow} className='mr-4 rounded-xl p-4 bg-primary-red'>
                    <View className='flex flex-row justify-around items-center'>
                    <Text className='color-white mr-4 font-bold'>Set Start</Text>
                    <NavigationIcon/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={handleGetDirections} style={styles.shadow} className='rounded-xl p-4 bg-primary-red'>
                    <View className='flex flex-row justify-around items-center'>
                    <Text className='color-white mr-4 font-bold'>Get Directions</Text>
                    <DirectionsIcon/>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    shadow: {
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      textAlign: 'center'
    }
});

export default MapResultItem;
