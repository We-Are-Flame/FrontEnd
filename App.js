/** @format */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./src/pages/Login/LoginPage";
import HomeScreen from './src/pages/Home/HomeScreen';
import NavContainer from "./src/components/NavContainer";
import KaKaoLogin from "./src/components/Kakao";
import { useState } from "react";


const Stack = createStackNavigator();


export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogin ? NavContainer : LoginPage}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} />
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
