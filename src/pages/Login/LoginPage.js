/** @format */

import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { PaperProvider, Portal, Modal } from "react-native-paper";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import LoginModal from "../../modals/LoginModal/LoginModal";
import theme from "../../styles/theme";
import modalHandleStore from "../../store/modalHandleStore";
const LoginPage = () => {
  const { setLoginModal } = modalHandleStore();

  const navigation = useNavigation();

  return (
    <PaperProvider>
      <LoginModal />
      <View style={styles.container}>
        <View style={styles.top}></View>
        <View style={styles.content}>
          <View style={{ marginVertical: "30%", height: "50%" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.contentTop }}>안녕하세요!</Text>
              <Text style={{ ...styles.contentTop }}>Kitching</Text>
            </View>
            <View style={{ flex: 0.8 }}>
              <Text style={styles.contentBottom}>로그인 후, 키칭을 통해</Text>
              <Text style={styles.contentBottom}>
                새로운 인연을 만나보세요!
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.startContainer}>
            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => {
                setLoginModal(true);
              }}
            >
              <Text style={{ color: theme.psColor, fontWeight: "600" }}>
                시작하기
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.noLoginContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home", { screen: "Home" })}
            >
              <Text style={{ fontWeight: "400", fontSize: 18, color: "white" }}>
                로그인 하지 않고 시작하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.psColor,
  },
  // top: { flex: 0.8, backgroundColor: theme.psColor, borderBottomWidth: 1 },
  top: { flex: 0.8, backgroundColor: theme.psColor },
  content: {
    flex: 2,
    backgroundColor: theme.psColor,
    paddingHorizontal: 40,
  },
  // bottom: { flex: 0.8, backgroundColor: theme.psColor, borderTopWidth: 1 },
  bottom: { flex: 0.8, backgroundColor: theme.psColor },
  contentTop: {
    color: "white",
    fontSize: theme.screenHeight / 24,
    lineHeight: theme.screenHeight / 24,
  },
  contentBottom: {
    color: "white",
    fontSize: theme.screenWidth / 24,
    fontWeight: "300",
  },
  startContainer: {
    flex: 1,
    ...theme.centerStyle,
    marginTop: "10%",
  },
  noLoginContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  startBtn: {
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "white",
    ...theme.centerStyle,
    borderWidth: 1,
    width: "90%",
    height: "55%",
  },
});

export default LoginPage;
