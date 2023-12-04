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
import { API_URL } from "@env";
import MyProfile from "./MyProfile/MyProfile";
import MyClub from "./MyClub/MyClub";
import theme from "../../styles/theme";
import Header from "../../components/Header";
import userStore from "../../store/userStore";
import { ActivityIndicator } from "react-native";
export default function ProfilePage() {
  const [refreshing, setRefreshing] = useState(false);
  const { setUserData, userToken, updatedState } = userStore();
  const [myClubData, setMyClubData] = useState({});
  const [pageLoading, setPageLoading] = useState(null);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const fetchData = async () => {
    setPageLoading(true);
    try {
      if (userToken) {
        const tokenValidationResponse = await axios.get(
          `${API_URL}/api/user/notification`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userToken,
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
              Authorization: "Bearer " + userToken,
            },
          });
          const mymeetings = await axios.get(`${API_URL}/api/meetings/my`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userToken,
            },
          });
          setMyClubData(mymeetings.data);
          setUserData(userInfoResponse.data);
        } else {
          console.log("유효하지 않은 토큰", tokenValidationResponse.status);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setPageLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [updatedState]);

  return (
    <View style={styles.profilePageView}>
      <View
        style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
      ></View>

      <Header />

      <View style={styles.profilePageMain}>
        {pageLoading ? (
          <View style={{ flex: 1, ...theme.centerStyle }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{ flex: 1 }}
          >
            <View style={styles.profilePageMainTop}>
              <MyProfile />
            </View>
            <View style={styles.profilePageMainBottom}>
              <View style={{ flex: 0.02, backgroundColor: theme.subColor }} />
              <MyClub myClubData={myClubData} />
            </View>
          </ScrollView>
        )}
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
