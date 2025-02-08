import { useEffect, useState, useRef } from 'react';
import { View, Animated, TextInput, StyleSheet, Text, TouchableOpacity, Dimensions, PanResponder } from "react-native";
import SearchIcon from './Icons/SearchIcon';
import MapResultItem from './MapResults/MapResultItem'

const MapResults = ({ searchText, isSearch, setIsSearch }) => {
    const [results, setResults] = useState([
        {
            name: 'Henry F.Hall Building',
            address: '1550 De Maisonneuve West, Montreal, QC H3G 1MB',
            isHandicap: true,
            isBike: true,
            isMetro: true,
            isInfo: true
        },
        {
            name: 'Henry F.Hall Building',
            address: '1550 De Maisonneuve West, Montreal, QC H3G 1MB',
            isHandicap: true,
            isBike: true,
            isMetro: true,
            isInfo: true
        }
    ]);
    const [selected, setSelected] = useState('');

    const screenHeight = Dimensions.get('window').height;
    const threshold = screenHeight * 0.25;  
    const pan = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(screenHeight * 0.75)).current;

    const handleSubmit = () => {
        // Handle search submit logic here
    };

    const renderResults = results.map((building, idx) => {
        return (
            <MapResultItem key={idx} name={building.name} address={building.address} isHandicap={building.isHandicap} isBike={building.isBike} isMetro={building.isMetro} isInfo={building.isInfo} />
        );
    });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy > 0) {
                    pan.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dy > threshold) {
                    Animated.timing(slideAnim, {
                        toValue: screenHeight,
                        duration: 300,
                        useNativeDriver: false,
                    }).start(() => setIsSearch(false));
                } else {
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    useEffect(() => {
        if (!isSearch) return;
        Animated.timing(slideAnim, {
            toValue: 0, 
            duration: 500, 
            useNativeDriver: false, 
        }).start();
    }, [isSearch]);

    if (!isSearch) return null;

    return (
        <View>
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    { 
                        transform: [{
                            translateY: Animated.add(slideAnim, pan)
                        }]
                    },
                    styles.slideView,
                ]}
            >
                <View className='flex flex-col justify-start items-center  w-full h-full'>
                    <View className='justify-start w-full'>
                        <Text className='left-0 font-bold text-3xl mt-4 mb-4'>Buildings</Text>
                    </View>
                    <View className='p-4 w-full justify-center mb-2 items-center'>
                        <View style={styles.shadow} className='flex flex-row justify-between w-80 p-4 bg-white rounded-lg'> 
                            <TextInput onSubmitEditing={handleSubmit} value={searchText} onChange={(text) => setSearchText(text)} placeholder="Search the campus" className='color-slate-400'/>
                            <SearchIcon/>
                        </View>
                    </View>
                    <View className='w-full mb-2 flex flex-row justify-center  items-center'>
                        <TouchableOpacity onPress={() => setSelected('loyola')} className='m-2'>
                            <Text className={'color-slate-400' + (selected === 'loyola' ? ' underline' : '')}>Loyola</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelected('sgw')} className='m-2'>
                            <Text className={'color-slate-400' + (selected === 'sgw' ? ' underline' : '')}>SGW</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelected('my_rooms')} className='m-2'>
                            <Text className={'color-slate-400' + (selected === 'my_rooms' ? ' underline' : '')}>My Rooms</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelected('library')} className='m-2'>
                            <Text className={'color-slate-400' + (selected === 'library' ? ' underline' : '')}>Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelected('dining')} className='m-2'>
                            <Text className={'color-slate-400' + (selected === 'dining' ? ' underline' : '')}>Dining</Text>
                        </TouchableOpacity>
                    </View>

                    <View className='flex flex-col justify-center items-center'>
                        {renderResults}
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadow: {
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        textAlign: 'center'
    },
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
    }
});

export default MapResults;
