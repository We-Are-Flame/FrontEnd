/** @format */

import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, View } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps";

const GoogleMap = ({ mylatitude, mylongitude, detailLocation }) => {
  const initialRegion = {
    latitude: parseFloat(mylatitude),
    longitude: parseFloat(mylongitude),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const [region, setRegion] = useState(initialRegion);
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
          pinColor="#2D63E2"
          title={detailLocation}
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
