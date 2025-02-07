import {useState} from 'react';
import { View, TextInput, StyleSheet} from "react-native";
import SearchIcon from './Icons/SearchIcon';


const MapSearch =  ({isSearch, setIsSearch, searchText, setSearchText}) => {

    const handleSubmit = () => {
        setIsSearch(true);
    }

    return (
        <View className='p-4 absolute w-full justify-center items-center mt-20'>
            <View style={styles.shadow} className='flex flex-row justify-between w-80 p-4 bg-white rounded-3xl'> 
                <TextInput onSubmitEditing={handleSubmit} value={searchText} onChange={(text) => setSearchText(text)} placeholder="Search the campus" className='color-slate-400'/>
                <SearchIcon/>
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

export default MapSearch