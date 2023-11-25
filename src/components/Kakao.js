/** @format */

import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { WebView } from "react-native-webview";
import { REST_API_KEY, REDIRECT_URI } from "@env";
import axios from "axios";

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

  const requestToken = async (authorize_code) => {
    let AccessToken = "none";
    axios({
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      params: {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: authorize_code,
      },
    })
      .then((response) => {
        AccessToken = response.data.access_token;
        // console.log(AccessToken);
        // requestUserInfo(AccessToken);
        storeaData(AccessToken);
      })
      .catch((err) => {
        console.log("error", error);
      });
    navigation.navigate("Login", { screen: "Login" });
  };

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1, marginTop: 40 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: `http://118.67.128.48/api/login/kakao`,
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