/** @format */

import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import theme from "../../styles/theme";
import Header from "./Header/Header";
import HomeContent from "./HomeContent/HomeContent";
import HomeCategory from "./HomeCategory/HomeCategory";

export default function HomeScreen() {
  return (
    <View style={styles.homeScreenView}>
      <View style={{ flex: 0.5, backgroundColor: theme.psColor }}></View>
      <View style={styles.homeScreenHeader}>
        <Header />
      </View>
      <View style={{ flex: 7 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.homeScreenCategory}>
            <Text style={styles.homeScreenCategoryText}>카테고리 별로</Text>
            <Text style={styles.homeScreenCategoryText}>확인해 보세요!</Text>
            <HomeCategory />
          </View>
          <View style={styles.homeScreenContent}>
            <HomeContent />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenView: {
    flex: 1,
  },
  homeScreenHeader: {
    flex: 1,
  },
  homeScreenCategory: {
    margin: 30,
  },
  homeScreenCategoryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
