import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Restart() {
    const navigation = useNavigation();
    
    return (
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Loading')}
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 5,
                }}
            >
                <Ionicons name="refresh" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}
