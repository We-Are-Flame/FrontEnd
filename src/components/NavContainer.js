/** @format */

import * as React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import HomeScreen from "../pages/Home/HomeScreen";
import RandomScreen from "../pages/Random/RandomScreen";
import ProfileScreen from "../pages/Profile/ProfileScreen";
import ChatScreen from "../pages/Chat/ChatScreen";

const homeName = "홈";
const randomName = "랜덤";
const chatName = "채팅";
const profileName = "마이";

const Tab = createMaterialBottomTabNavigator();

export default function NavContainer() {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent";
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{
          height: 100,
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
              iconName = focused ? "settings" : "settings-outline";
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
        <Tab.Screen name={randomName} component={RandomScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
