/** @format */

import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from "@react-navigation/native";
import LoginModal from "../../modals/LoginModal/LoginModal";
import theme from "../../styles/theme";
const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const showModal = () => {
    setIsVisible(true);
  };

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      {isVisible ? (
        <LoginModal />
      ) : (
        <View
          style={{
            ...styles.container,
          }}
        >
          <View style={styles.top}></View>
          <View style={styles.content}>
            <View style={{ marginVertical: "30%", height: "50%" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ ...styles.contentTop }}>안녕하세요!</Text>
                <Text style={{ ...styles.contentTop }}>Kitching</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contentBottom}>로그인 후, 키칭을 통해</Text>
                <Text style={styles.contentBottom}>
                  새로운 인연을 만나보세요!
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.startContainer}>
              <TouchableOpacity style={styles.startBtn} onPress={showModal}>
                <Text style={{ color: theme.psColor, fontWeight: "600" }}>
                  시작하기
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.noLoginContainer}>
              <TouchableOpacity>
                <Text
                  style={{ color: "white", fontWeight: "400", fontSize: 18 }}
                >
                  로그인 하지 않고 시작하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
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
    fontSize: 28,
    height: 30,
  },
  contentBottom: {
    color: "white",
    fontSize: 18,
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
