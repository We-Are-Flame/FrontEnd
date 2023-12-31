/** @format */

import * as React from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@env";
import { useState, useEffect } from "react";
import { PaperProvider, useTheme } from "react-native-paper";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import theme from "../styles/theme";
import HomeScreen from "../pages/Home/HomeScreen";
import RandomPage from "../pages/Random/RandomScreen";
import ProfilePage from "../pages/Profile/ProfilePage";
import ChatScreen from "../pages/Chat/ChatScreen";
import LoginModal from "../modals/LoginModal/LoginModal";
import userStore from "../store/userStore";

const homeName = "홈";
const randomName = "추천";
const chatName = "채팅";
const profileName = "마이";

const Tab = createMaterialBottomTabNavigator();

export default function NavContainer({ route }) {
  const custheme = useTheme();
  const { isLogin } = userStore();

  useEffect(() => {
    console.log(`로그인 되어있나? ${isLogin}`);
  }, [isLogin]);

  custheme.colors.secondaryContainer = "transparent";
  return (
    <PaperProvider>
      <Tab.Navigator
        barStyle={{
          height: theme.screenHeight / 8.5,
          borderTopWidth: 0.2,
          borderTopColor: "lightgray",
          backgroundColor: "white",
        }}
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === randomName) {
              iconName = focused ? "shuffle" : "shuffle-outline";
            } else if (rn === profileName) {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (rn === chatName) {
              iconName = focused
                ? "chatbubble-ellipses"
                : "chatbubble-ellipses-outline";
            }

            return <Ionicons name={iconName} size={23} color="black" />;
          },
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={chatName} component={ChatScreen} />
        <Tab.Screen name={randomName} component={RandomPage} />
        <Tab.Screen name={profileName} component={ProfilePage} />
      </Tab.Navigator>
    </PaperProvider>
  );
}
