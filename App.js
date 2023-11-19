/** @format */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";

import theme from "./src/styles/theme";
import ClubManagePage from "./src/pages/Club/ClubManagePage";
import LoginPage from "./src/pages/Login/LoginPage";
import NavContainer from "./src/components/NavContainer";
import KaKaoLogin from "./src/components/Kakao";
import HomeDetailPage from "./src/pages/Home/HomeDetailPage/HomeDetailPage";
import ProfileSetting from "./src/pages/Profile/ProfileSetting";

const Stack = createStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogin ? "Home" : "Login"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen
          name="Home"
          component={NavContainer}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} />
        <Stack.Screen name="ClubManagePage" component={ClubManagePage} />
        <Stack.Screen
          name="HomeDetailPage"
          component={HomeDetailPage}
          options={({ route }) => ({
            gestureEnabled: true,
            headerShown: true,
            title: route.params?.detailData?.nickname,
            headerBackTitle: " ",
            headerTintColor: "black",
          })}
        />
        <Stack.Screen
          name="ProfileSetting"
          component={ProfileSetting}
          options={{
            gestureEnabled: true,
            headerShown: true,
            headerBackTitle: " ",
            headerTintColor: "black",
            title: "설정",
          }}
        />
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
