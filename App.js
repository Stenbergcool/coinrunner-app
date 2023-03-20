import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import coinHandler from './models/coinHandler';

const coinIcon =  require('./assets/dollar.png');


export default function App() {
  const [coins, setCoins] = useState([])
  const [markers, setMarkers] = useState(null);

  useEffect(() => {
    (async () => {
        const points = await coinHandler.fetchCoins()
        setCoins(points)
    })();
  }, []);

  useEffect(() => {
    const marks = coins.map((e, i) => {
      return <Marker
      key={i}
      coordinate={ { latitude: e.latitude, longitude: e.longitude } }
      >
        <Image
        source={coinIcon}
        style={{ height: 20, width: 20 }}
        />
      </Marker>
    })
    setMarkers(marks)
  }, [coins]);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_map}>
        <MapView style={styles.map} showsUserLocation={true} showsCompass={true} showsBuildings={true}>
          {markers}
        </MapView>

      </View>
      <View style={styles.underBar}>
          <Text>UnderBar</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_map: {
    width:'100%',
    height:'100%'
  },
  map: {
    flex: 1,
    height: "100%",
  },
  underBar: {
    height: 180,
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 4,
    borderTopColor: "black"
  },
});
