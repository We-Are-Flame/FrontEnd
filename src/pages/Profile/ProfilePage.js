/** @format */

import * as React from "react";
import { useState, useCallback } from "react";
import theme from "../../styles/theme";
import Header from "../../components/Header";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import MyProfile from "./MyProfile";
import MyClub from "./MyClub";

export default function ProfilePage() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  return (
    <View style={styles.profilePageView}>
      <View
        style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
      ></View>
      <View style={styles.profilePageHeader}>
        <Header />
      </View>

      <View style={styles.profilePageMain}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.profilePageMainTop}>
            <MyProfile />
          </View>
          <View style={styles.profilePageMainBottom}>
            <View style={{ flex: 0.02, backgroundColor: theme.subColor }} />
            <MyClub />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profilePageView: {
    flex: 1,
    backgroundColor: "white",
  },
  profilePageHeader: {
    flex: 1,
  },
  profilePageMain: {
    flex: 7,
    // backgroundColor: "red",
  },
  profilePageMainTop: {
    // marginTop: 10,
    flex: 1,
    // backgroundColor: "blue",
  },
  profilePageMainBottom: {
    flex: 2,
    // backgroundColor: "green",
  },
});
