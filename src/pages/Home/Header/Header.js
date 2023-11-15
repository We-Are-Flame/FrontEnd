/** @format */

import * as React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Image } from "expo-image";

import { AntDesign } from "@expo/vector-icons";

import Logo from "../../../../assets/kitchingLogo.png";
import theme from "./../../../styles/theme";

import { useRoute } from "@react-navigation/core";
import { useState, useEffect } from "react";
export default function Header() {
  const [logoName, setLogoName] = useState("");
  const route = useRoute();

  useEffect(() => {
    console.log(route.name);
    selectLogoText(route.name);
  }, []);

  const selectLogoText = (routeName) => {
    if (routeName == "ClubManagePage") {
      setLogoName("신청 관리");
    } else if (routeName == "홈") {
      setLogoName("KitChing");
    }
  };
  return (
    <View style={styles.headerView}>
      <View style={styles.headerLogoView}>
        <TouchableOpacity>
          <Text style={styles.headerLogoText}>{logoName}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerCenter}></View>
      <View style={styles.headerCenter}></View>
      <View style={styles.headerIconView}>
        <TouchableOpacity>
          <AntDesign name="search1" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="bells" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    // marginTop: 30,
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.psColor,
  },
  headerCenter: {
    flex: 2,
  },
  headerLogoView: {
    flex: 3,
    ...theme.centerStyle,
  },
  headerLogoText: {
    fontWeight: "bold",
    fontSize: theme.screenWidth / 16,
    // marginTop: 25,
    // marginLeft: 20,

    color: "#ffffff",
  },
  headerIconView: {
    flexDirection: "row",
    flex: 2,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
