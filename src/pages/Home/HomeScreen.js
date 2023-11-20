/** @format */

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useState, useCallback } from "react";
import theme from "../../styles/theme";
import Header from "./Header/Header";
import HomeContent from "./HomeContent/HomeContent";
import HomeCategory from "./HomeCategory/HomeCategory";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <View style={styles.homeScreenView}>
      <View
        style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
      ></View>
      <View style={styles.homeScreenHeader}>
        <Header />
      </View>
      <View style={{ flex: 7 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ flex: 1 }}
        >
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
    backgroundColor: theme.psColor,
  },
  homeScreenCategory: {
    margin: 30,
  },
  homeScreenCategoryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
