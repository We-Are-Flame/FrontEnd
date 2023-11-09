/** @format */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import LoginPage from "./src/pages/Login/LoginPage";

import NavContainer from "./src/components/NavContainer";
import { useState } from "react";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  return <>{isLogin ? <NavContainer /> : <LoginPage />}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
