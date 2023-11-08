/** @format */

import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import theme from "../../styles/theme";
const LoginPage = () => {
  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <View style={styles.top}></View>
      <View style={styles.content}>
        <View style={{ marginVertical: "auto", height: "50%" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...styles.contentTop }}>안녕하세요!</Text>
            <Text style={{ ...styles.contentTop }}>Kitching</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.contentBottom}>로그인 후, 키칭을 통해</Text>
            <Text style={styles.contentBottom}>새로운 인연을 만나보세요!</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${theme.psColor}`,
  },
  top: { flex: 1, backgroundColor: "black" },
  content: { flex: 2, backgroundColor: "red", paddingHorizontal: 40 },
  bottom: { flex: 1, backgroundColor: "green" },
  contentTop: {
    color: "white",
    fontSize: 26,
    height: 30,
  },
  contentBottom: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
  },
});

export default LoginPage;
