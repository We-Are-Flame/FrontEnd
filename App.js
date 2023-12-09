/** @format */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Pressable, Text, View, Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import { PaperProvider } from "react-native-paper";
import { HeaderBackButton } from "@react-navigation/elements";

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
import ChatSettingPage from "./src/pages/Chat/ChatSettingPage/ChatSettingPage";
import ChatDetailPage from "./src/pages/Chat/ChatDetailPage/ChatDetailPage";
import UnivAuth from "./src/pages/Profile/UniAuth/UnivAuth";
import LoginModal from "./src/modals/LoginModal/LoginModal";
import SearchBar from "./src/pages/Search/SearhBar";
import SearchContent from "./src/pages/Search/SearchContent";

const Stack = createStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  return (
    <PaperProvider>
      <NavigationContainer>
        <LoginModal />
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
            options={{
              gestureEnabled: false,
              headerShown: true,
              title: "신청 관리",
              headerBackTitle: " ",
              headerTintColor: "black",
            }}
          />
          <Stack.Screen
            name="HomeDetailPage"
            component={HomeDetailPage}
            options={({ route }) => ({
              gestureEnabled: false,
              title: route.params?.title,
              headerShown: true,
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
          <Stack.Screen
            name="ChatDetailPage"
            component={ChatDetailPage}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("ChatSettingPage", {
                      roomId: route.params.roomId,
                    })
                  }
                  style={{ marginRight: 20 }}
                >
                  <AntDesign name="ellipsis1" size={24} color="black" />
                </Pressable>
              ),
              gestureEnabled: false,
              headerShown: true,
              title: "채팅",
              headerBackTitle: " ",
              headerTintColor: "black",
            })}
          />
          <Stack.Screen
            name="ChatSettingPage"
            component={ChatSettingPage}
            options={({ route }) => ({
              gestureEnabled: false,
              headerShown: true,
              title: "채팅 설정",
              headerBackTitle: " ",
              headerTintColor: "black",
            })}
          />
          <Stack.Screen
            name="UnivAuth"
            component={UnivAuth}
            options={({ route }) => ({
              gestureEnabled: false,
              headerShown: true,
              title: "학교 이메일 인증",
              headerBackTitle: " ",
              headerTintColor: "black",
            })}
          />
          <Stack.Screen
            name="Search"
            component={SearchContent}
            options={({ navigation, route }) => ({
              headerLeft: ({ onPress }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <HeaderBackButton
                    labelVisible={false}
                    tintColor="black"
                    onPress={onPress}
                  />
                  <SearchBar />
                </View>
              ),
              headerTitle: " ",
              headerBackVisible: true,
              gestureEnabled: false,
              headerShown: true,
              headerBackTitle: " ",
              headerTintColor: "black",
              headerStyle: {
                shadowColor: "transparent", // this covers iOS
                elevation: 0, // this covers Andro
              },
            })}
          />
          {/* <Stack.Screen
            name="SearchResult"
            component={SearchResult}
            options={({ navigation, route }) => ({
              headerLeft: ({ onPress }) => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <HeaderBackButton
                    labelVisible={false}
                    tintColor="black"
                    onPress={onPress}
                  />
                  <SearchBar />
                </View>
              ),
              headerTitle: " ",
              headerBackVisible: true,
              gestureEnabled: false,
              headerShown: true,
              headerBackTitle: " ",
              headerTintColor: "black",
              headerStyle: {
                shadowColor: "transparent", // this covers iOS
                elevation: 0, // this covers Andro
              },
            })}
          /> */}
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
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
