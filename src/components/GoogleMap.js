/** @format */

import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps";

const GoogleMap = ({ latitude, longitude }) => {
  const initialRegion = {
    latitude: latitude ? latitude : 36.4250364688847,
    longitude: longitude ? longitude : 128.167240393244,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
  const [region, setRegion] = useState(initialRegion);
  useEffect(() => {
    console.log(latitude, longitude);
  }, [latitude, longitude]);
  return (
    <View style={styles.screen}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        region={region}
        scrollEnabled={false}
        pointerEvents="none"
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          onPress={() => {
            console.log("시부레");
          }}
          pinColor="#2D63E2"
          title="하이"
        />
      </MapView>
    </View>
  );
};

export default GoogleMap;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
