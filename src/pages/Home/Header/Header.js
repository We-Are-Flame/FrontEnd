/** @format */

import * as React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import theme from "./../../../styles/theme";

import { useRoute } from "@react-navigation/core";
import { useState, useEffect } from "react";
export default function Header() {
  const [isLogin, setIsLogin] = useState(true);
  const [logoName, setLogoName] = useState("");
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    console.log(route.name);
    selectLogoText(route.name);
  }, []);
  const setIcons = (routeName, isLogin) => {
    if (!isLogin) {
      return <View style={styles.headerIconView}></View>;
    }
    let icons;
    if (routeName == "마이") {
      icons = (
        <View style={styles.headerIconView}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() =>
              navigation.navigate("ProfileSetting", {
                screen: "ProfileSetting",
              })
            }
          >
            <Ionicons
              name="ellipsis-horizontal-sharp"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      );
    } else if (routeName == "홈") {
      icons = (
        <View style={styles.headerIconView}>
          <TouchableOpacity>
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="bells" size={24} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
    return icons;
  };
  const selectLogoText = (routeName) => {
    if (routeName == "ClubManagePage") {
      setLogoName("신청 관리");
    } else if (routeName == "홈") {
      setLogoName("KitChing");
    } else if (routeName == "마이") {
      setLogoName("마이홈");
    }
  };
  return (
    <View style={styles.headerView}>
      <View style={{ flex: 0.4 }} />
      <View style={styles.headerLogoView}>
        <TouchableOpacity>
          <Text style={styles.headerLogoText}>{logoName}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerCenter}></View>
      <View style={styles.headerCenter}></View>
      {setIcons(route.name, isLogin)}
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    // marginTop: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.psColor,
  },
  headerCenter: {
    flex: 2,
  },
  headerLogoView: {
    flex: 3,
    justifyContent: "center",
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
