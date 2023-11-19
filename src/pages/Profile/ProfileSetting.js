/** @format */

import * as React from "react";
import theme from "../../styles/theme";
import Header from "../Home/Header/Header";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ProfileSetting() {
  const menus = ["계정정보", "알림설정", "문의하기", "로그아웃"];

  return (
    <View style={styles.profileSettingView}>
      {menus.map((data, index) => (
        <TouchableOpacity
          key={index}
          style={styles.profileSettingItemContainer}
        >
          <Text style={styles.profileSettingItem}>{data}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.profileSettingBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileSettingView: {
    flex: 1,
    backgroundColor: "white",
  },
  profileSettingItemContainer: {
    flex: 1,
    paddingLeft: theme.screenWidth / 30,
    justifyContent: "center",
  },
  profileSettingItem: {
    color: "black",
    fontSize: theme.screenWidth / 24,
  },
  profileSettingBottom: {
    flex: 6,
  },
});
