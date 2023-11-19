/** @format */

import * as React from "react";
import theme from "../../styles/theme";
import Header from "../Home/Header/Header";
import { View, Text, StyleSheet } from "react-native";
import MyProfile from "./MyProfile";

export default function ProfilePage() {
  return (
    <View style={styles.profilePageView}>
      <View style={{ flex: 0.5, backgroundColor: theme.psColor }}></View>
      <View style={styles.profilePageHeader}>
        <Header />
      </View>
      <View style={styles.profilePageMain}>
        <View style={styles.profilePageMainTop}>
          <MyProfile />
        </View>
        <View style={styles.profilePageMainBottom} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profilePageView: {
    flex: 1,
  },
  profilePageHeader: {
    flex: 1,
  },
  profilePageMain: {
    flex: 7,
    // backgroundColor: "red",
  },
  profilePageMainTop: {
    flex: 4,
    // backgroundColor: "blue",
  },
  profilePageMainBottom: {
    flex: 6,
    backgroundColor: "green",
  },
});
