/** @format */

import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import theme from "../../styles/theme";

import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";

import { API_URL } from "@env";
import searchStore from "../../store/searchStore";
export default function RecentlyItems({ data }) {
  return (
    <View style={styles.recentlyItemsView}>
      <View style={styles.iconContainer}>
        <Feather name="clock" size={16} color="gray" />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text numberOfLines={1} style={{ fontSize: 18 }}>
          {data.title}
        </Text>
      </View>
      <View style={{ flexGrow: 0, alignItems: "flex-end" }}>
        <AntDesign name="close" size={20} color="#868B94" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recentlyItemsView: {
    // backgroundColor: "red",

    // padding: 20,
    height: 60,
    flexDirection: "row",

    alignItems: "center",
  },
  iconContainer: {
    ...theme.centerStyle,

    width: 30,
    height: 30,
    flexGrow: 0,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 15,
  },
});
