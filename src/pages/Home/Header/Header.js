/** @format */

import * as React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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
        {/* <Image
          style={{ width: "100%", height: "100%" }}
          source={Logo}
          contentFit="contain"
        /> */}


        <TouchableOpacity>
          <Text style={styles.headerLogoText}>
            KitChing
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerCenter}>

      </View>
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
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.psColor,
    paddingBottom: 20,
  },
  headerCenter: {
    flex: 2,
  },
  headerLogoView: {
    flex: 4,
  },
  headerLogoText: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 25,
    marginLeft: 20,
    color: "#ffffff",
  },
  headerIconView: {
    flexDirection: "row",
    flex: 2,
    marginTop: 30,
    justifyContent: "space-evenly",
  },
});
