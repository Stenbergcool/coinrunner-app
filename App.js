import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import coinHandler from './models/coinHandler';

const coinIcon =  require('./assets/290-coin-flat.gif');
const userIcon =  require('./assets/user.png');
const settingIcon =  require('./assets/settings.png');


export default function App() {
  const [coins, setCoins] = useState([])
  const [markers, setMarkers] = useState(null);
  const [followUser, setFollowUser] = useState(true);
  const count = useRef(0);

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

  function followOrNot() {
    if(followUser) {
      setFollowUser(false)
    } else {
      setFollowUser(true)
    }
    console.log(followUser)
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_map}>
        <MapView style={styles.map} followsUserLocation={followUser} showsMyLocationButton={true} showsUserLocation={true} showsCompass={true} showsBuildings={true}>
          {markers}
        </MapView>

      </View>
      <View style={styles.underBar}>
        <View style={styles.mapTrackerClick}>
          <Text onPress={(e) => {followOrNot()}}>
            Click
          </Text>
        </View>
        <View style={styles.profileView}>
          <Image source={userIcon}/>
        </View>
        <View style={styles.settingView}>
          <Image source={settingIcon}/>
        </View>
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
  mapTrackerClick: {
    position: "absolute",
    top: -50,
    right: 10,
  },
  underBar: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: "100%",
    backgroundColor: "#6B7A8F",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 10,
    borderTopColor: "#6B7A8F",
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  settingView: {
    marginLeft: 'auto'
  },
  profileView: {

  },
});
