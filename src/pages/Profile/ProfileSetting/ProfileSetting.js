/** @format */

import * as React from "react";
import theme from "../../../styles/theme";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import userStore from "../../../store/userStore";
export default function ProfileSetting() {
  const menus = ["계정정보", "알림설정", "문의하기", "로그아웃"];
  const {
    updatedState,
    setUpdatedState,
    setUserToken,
    setIsLogin,
    setUserData,
    userData,
    userToken,
  } = userStore();
  const navigation = useNavigation();
  const resetData = {
    nickname: "",
    profile_image: "",
    temperature: 0,
    my_meetings: 0,
  };

  const handleMenuPress = (menu) => {
    switch (menu) {
      case "계정정보":
        navigation.navigate("AccountInfo");
        break;
      case "알림설정":
        navigation.navigate("NotificationSettings");
        break;
      case "문의하기":
        navigation.navigate("Inquiry");
        break;
      case "로그아웃":
        Alert.alert("로그아웃 하시겠습니까?", "", [
          {
            text: "취소",
            onPress: () => {
              console.log("취소");
            },
          },
          {
            text: "확인",
            onPress: async () => {
              try {
                await AsyncStorage.removeItem("userAccessToken");
                setUserToken(" ");
                setUserData(resetData);
                setIsLogin(false);
                navigation.navigate("Home");
              } catch (err) {
                console.log(err);
              }
            },
          },
        ]);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    console.log(userToken);
  }, [userData, userToken]);
  return (
    <View style={styles.profileSettingView}>
      {menus.map((data, index) => (
        <TouchableOpacity
          key={index}
          style={styles.profileSettingItemContainer}
          onPress={() => {
            handleMenuPress(data);
          }}
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
