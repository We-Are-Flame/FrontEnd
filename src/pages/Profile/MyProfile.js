/** @format */

import * as React from "react";
import theme from "../../styles/theme";
import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";
import ProfileImg from "../../../assets/chunsik.webp";
import LionProfile from "../../../assets/lion.webp";
export default function MyProfile() {
  return (
    <View style={styles.myProfileView}>
      <View style={styles.myProfileViewTop}>
        <View style={styles.myProfileImgContainer}>
          <Image style={styles.image} source={LionProfile} contentFit="cover" />
        </View>
        <View style={styles.myPrfoileNameContainer} />
      </View>
      <View style={styles.myProfileViewBottom}>
        <Image source={ProfileImg} contentFit="cover" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myProfileView: {
    flex: 1,
    marginHorizontal: theme.screenWidth / 30,
  },
  myProfileImgContainer: {
    flex: 3,
    padding: 10,
  },
  myPrfoileNameContainer: {
    flex: 7,
  },
  myProfileViewTop: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "red",
  },
  myProfileViewBottom: {
    flex: 1,
    backgroundColor: "grey",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "50%",
    borderRadius: theme.screenWidth / 6,
  },
});
