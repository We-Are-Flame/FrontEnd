/** @format */

import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios from "axios";

import theme from "../../styles/theme";
import userStore from "../../store/userStore";

export default function SplashPage() {
  const [animating, setAnimating] = useState(true);
  const { setUserToken, setIsLogin, setUserData } = userStore();
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem("userAccessToken");
        console.log(token);

        if (token !== null) {
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/user/notification`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          const userInfoResponse = await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}/api/user`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          ); //채팅에서 사용하기 위해 스플래시 페이지에서 미리 사용자 정보를 가져옴
          setUserToken(token);
          setUserData(userInfoResponse.data);
          setIsLogin(true);
          setAnimating(false);
          navigation.replace("Home");
        } else {
          navigation.replace("Login");
        }
      } catch (err) {
        navigation.replace("Login");
        console.log("에러 발생", err);
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.splashPageView}>
      <View
        style={{
          ...theme.centerStyle,
          flex: 1,
        }}
      >
        <Image
          source={{
            uri: "https://kr.object.ncloudstorage.com/nanum-bucket/20231128155940_kitchingLogo.png",
          }}
          style={{
            width: theme.screenWidth * 0.55,
            height: 300,
            resizeMode: "contain",
          }}
        />
        <ActivityIndicator
          animating={animating}
          color="black"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashPageView: {
    flex: 1,
    ...theme.centerStyle,
    backgroundColor: "white",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
