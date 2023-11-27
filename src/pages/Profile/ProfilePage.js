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
export default function ProfilePage() {
  const [refreshing, setRefreshing] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [userToken, setUserToken] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("userAccessToken");
        if (token !== null) {
          setUserToken(token);
          axios
            .get(`${API_URL}/api/user`, {
              headers: {
                "Content-Type": `application/json`,
                Authorization: "Bearer " + `${token}`,
              },
            })
            .then((res) => {
              console.log(res.data);
              setUserInfo(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  return (
    <View style={styles.profilePageView}>
      <View
        style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
      ></View>

      <Header userToken={userToken} />

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
