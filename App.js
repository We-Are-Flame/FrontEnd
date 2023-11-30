/** @format */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect, useCallback } from "react";

import theme from "./src/styles/theme";
import ClubManagePage from "./src/pages/Club/ClubManagePage";
import LoginPage from "./src/pages/Login/LoginPage";
import NavContainer from "./src/components/NavContainer";
import KaKaoLogin from "./src/components/Kakao";
import HomeDetailPage from "./src/pages/Home/HomeDetailPage/HomeDetailPage";

import CreateClubPostPage from "./src/pages/Club/CreateClubPostPage/CreateClubPostPage";
import FindAddress from "./src/components/FindAddress";
import SplashPage from "./src/pages/Splash/SplashPage";
import ProfileSetting from "./src/pages/Profile/ProfileSetting/ProfileSetting";
import ContactUs from "./src/pages/Profile/ProfileSetting/ContactUs";
import AlarmSetting from "./src/pages/Profile/ProfileSetting/AlarmSetting";
import AccountInfo from "./src/pages/Profile/ProfileSetting/AccountInfo";
const Stack = createStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashPage"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="SplashPage"
          component={SplashPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Home"
          component={NavContainer}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="KaKaoLogin"
          component={KaKaoLogin}
          options={{
            gestureEnabled: false,
            headerShown: true,
            title: "",
            headerBackTitle: " ",
            headerTintColor: "black",
          }}
        />
        <Stack.Screen
          name="ClubManagePage"
          component={ClubManagePage}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="HomeDetailPage"
          component={HomeDetailPage}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: true,
            title: route.params?.hostName,
            headerBackTitle: " ",
            headerTintColor: "black",
          })}
        />

        <Stack.Screen
          name="ProfileSetting"
          component={ProfileSetting}
          options={{
            gestureEnabled: false,
            headerShown: true,
            headerBackTitle: " ",
            headerTintColor: "black",
            title: "설정",
          }}
        />
        <Stack.Screen
          name="CreateClubPostPage"
          component={CreateClubPostPage}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: true,
            title: "모임만들기",
            headerBackTitle: " ",
            headerTintColor: "black",
          })}
        />
        <Stack.Screen
          name="FindAddress"
          component={FindAddress}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: true,
            title: " ",
            headerBackTitle: " ",
            headerTintColor: "black",
          })}
        />
        <Stack.Screen
          name="AccountInfo"
          component={AccountInfo}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: true,
            title: "계정 정보",
            headerBackTitle: " ",
            headerTintColor: "black",
          })}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: true,
            title: "문의하기",
            headerBackTitle: " ",
            headerTintColor: "black",
          })}
        />
        <Stack.Screen
          name="AlarmSetting"
          component={AlarmSetting}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: true,
            title: "알림설정",
            headerBackTitle: " ",
            headerTintColor: "black",
          })}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
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
