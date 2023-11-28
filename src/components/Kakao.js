/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { WebView } from "react-native-webview";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function KaKaoLogin() {
  const navigation = useNavigation();

  const storeData = async (access_token) => {
    try {
      await AsyncStorage.setItem("userAccessToken", access_token);
    } catch (err) {
      console.log(err);
    }
  };
  const KakaoLoginWebView = (data) => {
    const exp = "token=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var access_token = data.substring(condition + exp.length);
      navigation.navigate("Login", { screen: "Login" });
      storeData(access_token);
    }
  };

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1, marginTop: 40 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: `${API_URL}/api/login/kakao`,
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
