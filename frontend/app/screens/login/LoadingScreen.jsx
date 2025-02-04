import React, { useEffect } from 'react';
import { View } from 'react-native';
import ConcordiaLogo from '../../components/ConcordiaLogo';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: '#862532', justifyContent: 'center', alignItems: 'center' }}>
      <ConcordiaLogo width={288} height={96} />
    </View>
  );
}
