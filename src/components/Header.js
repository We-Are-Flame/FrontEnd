/** @format */

import * as React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import theme from "../styles/theme";

import { useRoute } from "@react-navigation/core";
import { useState, useEffect } from "react";

import modalHandleStore from "../store/modalHandleStore";
import userStore from "../store/userStore";

export default function Header() {
  const [logoName, setLogoName] = useState("");
  const route = useRoute();
  const navigation = useNavigation();
  const { isLogin } = userStore();
  const { loginModal, setLoginModal } = modalHandleStore();

  useEffect(() => {
    console.log(route.name);
    selectLogoText(route.name);
  }, []);

  const setIcons = (routeName, isLogin) => {
    if (!isLogin) {
      return (
        <View
          style={{ ...styles.headerIconView, justifyContent: "space-between" }}
        >
          {routeName === "홈" ? (
            <TouchableOpacity style={{ flex: 0.5 }}>
              <AntDesign name="search1" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <View style={{ flex: 0.5 }} />
          )}

          <TouchableOpacity
            onPress={() => {
              setLoginModal(true);
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: 70,
                borderRadius: 20,
                height: 30,
                ...theme.centerStyle,
              }}
            >
              <Text
                style={{
                  color: theme.psColor,
                  fontWeight: "600",
                  fontSize: 16,
                }}
              >
                로그인
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    let icons;
    if (routeName == "마이") {
      icons = (
        <View style={{ ...styles.headerIconView, justifyContent: "flex-end" }}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
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
      setLogoName("Kitching");
    } else if (routeName == "마이") {
      setLogoName("마이홈");
    } else if (routeName == "채팅") {
      setLogoName("채팅");
    } else if (routeName == "랜덤") {
      setLogoName("추천 모임");
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
      <View style={styles.headerCenter} />
      <View style={styles.headerCenter} />
      {setIcons(route.name, isLogin)}
      <View style={{ flex: 0.4 }} />
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
    flex: 1,
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
    flex: 2.5,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
