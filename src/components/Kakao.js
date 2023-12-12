/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { WebView } from "react-native-webview";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userStore from "../store/userStore";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function KaKaoLogin() {
  const { setIsLogin, setUserToken, setUserData } = userStore();
  const navigation = useNavigation();

  const storeData = async (access_token) => {
    try {
      await AsyncStorage.setItem("userAccessToken", access_token);
    } catch (err) {
      console.log(err);
    }
  };
  const KakaoLoginWebView = async (data) => {
    const exp = "token=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var access_token = data.substring(condition + exp.length);
      const userInfoResponse = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }); //채팅에서 사용하기 위해 스플래시 페이지에서 미리 사용자 정보를 가져옴
      setUserToken(access_token);
      setUserData(userInfoResponse.data);
      console.log("userInfo" + userInfoResponse);
      storeData(access_token);
      setIsLogin(true);
      navigation.replace("Home", { screen: "Home" });
    }
  };

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1, marginTop: 40 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: `${process.env.EXPO_PUBLIC_API_URL}/api/login/kakao`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          KakaoLoginWebView(event.nativeEvent["url"]);
        }}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
