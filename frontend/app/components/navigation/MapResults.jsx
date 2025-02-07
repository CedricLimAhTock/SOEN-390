import {useEffect, useState} from 'react';
import { View, TextInput, StyleSheet, Text, Touchable, TouchableOpacity} from "react-native";
import SearchIcon from './Icons/SearchIcon';
import MapResultItem from './MapResults/MapResutItem';


const MapResults =  ({searchText}) => {

    const [results, setResults] = useState([
        {
            name: 'Henry F.Hall Building',
            address: '1550 De Maisonneuve West, Montreal, QC H3G 1MB',
            isHandicap: true,
            isBike: true,
            isMetro: true,
            isInfo: true
        }
    ])
    const [selected, setSelected] = useState('')

    const handleSubmit = () => {

    }

    const renderResults = results.map((building, idx) => {
        return (
            <MapResultItem key={idx} name={building.name} address={building.address} isHandicap={building.isHandicap} isBike={building.isBike} isMetro={building.isMetro} isInfo={building.isInfo}/>
        )
    })

    useEffect(() => {}, [selected])

    return (
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
            <View className='w-full mb-2 flex flex-row justify-center items-center'>
                    <TouchableOpacity onPress={(event) => setSelected('loyola')} className='m-2'><Text className={'color-slate-400'+selected === 'loyola' ? 'underline' : ''}>Loyola</Text></TouchableOpacity>
                    <TouchableOpacity onPress={(event) => setSelected('sgw')} className='m-2'><Text className={'color-slate-400'+selected === 'sgw' ? 'underline' : ''}>SGW</Text></TouchableOpacity>
                    <TouchableOpacity onPress={(event) => setSelected('my_rooms')} className='m-2'><Text className={'color-slate-400'+selected === 'my_rooms' ? 'underline' : ''}>My Rooms</Text></TouchableOpacity>
                    <TouchableOpacity onPress={(event) => setSelected('library')} className='m-2'><Text className={'color-slate-400'+selected === 'library' ? 'underline' : ''}>Library</Text></TouchableOpacity>
                    <TouchableOpacity onPress={(event) => setSelected('dining')} className='m-2'><Text className={'color-slate-400'+selected === 'dining' ? 'underline' : ''}>Dining</Text></TouchableOpacity>
            </View>

            <View className='flex flex-col justify-center items-center'>
                {renderResults}
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

export default MapResults