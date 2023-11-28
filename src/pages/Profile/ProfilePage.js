/** @format */

import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import MyProfile from "./MyProfile/MyProfile";
import MyClub from "./MyClub/MyClub";
import theme from "../../styles/theme";
import Header from "../../components/Header";
export default function ProfilePage({ isLogin }) {
  const [refreshing, setRefreshing] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userToken, setUserToken] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("userAccessToken");
      if (token !== null) {
        const tokenValidationResponse = await axios.get(
          `${API_URL}/api/user/notification`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (tokenValidationResponse.status === 200) {
          console.log(
            "토큰 유효함",
            tokenValidationResponse.data.is_user_notification
          );
          const userInfoResponse = await axios.get(`${API_URL}/api/user`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });
          setUserInfo(userInfoResponse.data);
        } else {
          console.log("유효하지 않은 토큰", tokenValidationResponse.status);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.profilePageView}>
      <View
        style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
      ></View>

      <Header isLogin={isLogin} />

      <View style={styles.profilePageMain}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.profilePageMainTop}>
            <MyProfile userInfo={userInfo} />
          </View>
          <View style={styles.profilePageMainBottom}>
            <View style={{ flex: 0.02, backgroundColor: theme.subColor }} />
            <MyClub userToken={userToken} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profilePageView: {
    flex: 1,
    backgroundColor: "white",
  },
  profilePageHeader: {
    flex: 1,
  },
  profilePageMain: {
    flex: 7,
    // backgroundColor: "red",
  },
  profilePageMainTop: {
    // marginTop: 10,
    flex: 1,
    // backgroundColor: "blue",
  },
  profilePageMainBottom: {
    flex: 2,
    // backgroundColor: "green",
  },
});
