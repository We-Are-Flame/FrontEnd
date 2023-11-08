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
        <Text style={styles.contentText}>안녕하세요!</Text>
        <Text style={styles.contentText}>Kitching</Text>
        <Text style={styles.contentText}>
          로그인 후, 키칭을 통해 새로운 인연을 만나보세요!
        </Text>
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
  content: { flex: 2, backgroundColor: "red" },
  bottom: { flex: 1, backgroundColor: "green" },
  contentText: {
    color: "white",
    fontSize: 24,
  },
});

export default LoginPage;
