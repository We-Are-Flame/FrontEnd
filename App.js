/** @format */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import ClubManagePage from "./src/pages/Club/ClubManagePage";
import LoginPage from "./src/pages/Login/LoginPage";
import NavContainer from "./src/components/NavContainer";
import KaKaoLogin from "./src/components/Kakao";
import HomeDetailPage from './src/pages/Home/HomeDetailPage/HomeDetailPage';
import { useState } from "react";

const Stack = createStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogin ? "Home" : "Login"}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={NavContainer} />
        <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} />
        <Stack.Screen name="ClubManagePage" component={ClubManagePage} />
        <Stack.Screen name="HomeDetailPage" component={HomeDetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
