import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import HomeContentItem from "./HomeContentItem/HomeContentItem";

import userStore from "../../../store/userStore";

export default function HomeContent({ clubList }) {
  return (
    <View style={styles.homeContentView}>
      {clubList.content &&
        clubList.content.map((state, index) => (
          <HomeContentItem state={state} key={index} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({});
