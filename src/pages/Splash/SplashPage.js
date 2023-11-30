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

import LoginModal from "../../modals/LoginModal/LoginModal";
import theme from "../../styles/theme";
import Logo from "../../../assets/kitchingLogo.png";
import userStore from "../../store/userStore";

export default function SplashPage() {
  const [animating, setAnimating] = useState(true);
  const { setUserToken, setIsLogin } = userStore();
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(async () => {
      setAnimating(false);

      const token = await AsyncStorage.getItem("userAccessToken");
      console.log(token);

      if (token !== null) {
        await axios
          .get(`${API_URL}/api/user/notification`, {
            headers: {
              "Content-Type": `application/json`,
              Authorization: "Bearer " + `${token}`,
            },
          })
          .then((res) => {
            console.log("??");
            setUserToken(token);
            setIsLogin(true);
            navigation.replace("Home");
          })
          .catch((err) => {
            navigation.replace("Login");
            console.log(err);
          });
      } else {
        navigation.replace("Login"); // 이슈
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
