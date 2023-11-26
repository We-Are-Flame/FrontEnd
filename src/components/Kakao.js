/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { WebView } from "react-native-webview";
import { REST_API_KEY, REDIRECT_URI } from "@env";
import axios from "axios";
import { API_URL } from "@env";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KaKaoLogin = () => {
  const navigation = useNavigation();
  function KakaoLoginWebView(data) {
    // const exp = "code=";
    console.log(data);
    navigation.navigate("Login", { screen: "Login" });
    // var condition = data.indexOf(exp);
    // if (condition != -1) {
    //   var authorize_code = data.substring(condition + exp.length);
    //   console.log(authorize_code);
    //   requestToken(authorize_code);
    // }
  }


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
};

export default KaKaoLogin;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});