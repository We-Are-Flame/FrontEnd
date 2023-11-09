/** @format */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import LoginPage from "./src/pages/Login/LoginPage";
import ProfileScreen from "./src/pages/Profile/ProfileScreen";
import NavContainer from "./src/components/NavContainer";
import { useState } from "react";
import LoginModal from "./src/modals/LoginModal/LoginModal";
import MyLoginModal from "./src/modals/LoginModal/MyLoginModal";
export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  return <>{isLogin ? <LoginModal /> : <LoginPage />}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
