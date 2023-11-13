/** @format */

import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Header from "./Header/Header";
import HomeContent from "./HomeContent/HomeContent";

export default function HomeScreen() {
  return (
    <View style={styles.homeScreenView}>
      <View style={styles.homeScreenHeader}>
        <Header />
      </View>
      <View style={styles.homeScreenContent}>
        <ScrollView>
          <HomeContent />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenView: {
    backgroundColor: "white",
    flex: 1,
  },
  homeScreenHeader: {
    flex: 1,
  },
  homeScreenContent: {
    flex: 6,
  },
});
