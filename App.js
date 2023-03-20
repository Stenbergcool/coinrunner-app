import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_map}>
        <MapView style={styles.map} followsUserLocation={true} showsUserLocation={true} showsCompass={true} showsBuildings={true}/>
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
