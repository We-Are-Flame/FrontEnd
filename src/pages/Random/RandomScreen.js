import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";

import Header from "./../../components/Header";
import theme from "../../styles/theme";
import MyCarousel from "./../../components/MyCarousel";
import axios from "axios";
import userStore from "../../store/userStore";
import { API_URL } from "@env";
import Loading from "../../components/Loading";

export default function RandomScreen({ navigation }) {
  const [data, setData] = useState([]);
  const { userToken } = userStore();
  const [pageLoading, setPageLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const ment = [
    "오늘은 이 모임 어떠세요?",
    "찾았다 !",
    "오늘은 여기가 좋겠다 !",
    "나의 불꽃은 여기서?",
    "위대함에 동참하라.",
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const fetchData = async () => {
    setPageLoading(true);
    try {
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/meetings?index=0&size=10&sort=soon`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + `${userToken}`,
          },
        }
      );
      setData(shuffleArray(res.data.content));
    } catch (err) {
      console.log(err);
    } finally {
      setPageLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  function getRandomMent() {
    const randomIndex = Math.floor(Math.random() * ment.length);
    return ment[randomIndex];
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.randomScreenHeaderSpace} />
      <Header />

      <View style={{ flex: 7 }}>
        {pageLoading ? (
          <Loading />
        ) : (
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ flex: 1 }}>
              <View style={{ ...theme.centerStyle, flex: 1 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  {getRandomMent()}
                </Text>
              </View>
              <MyCarousel
                entries={data}
                widthProps={Dimensions.get("window").width}
                heightProps={400}
                layout="tinder"
                flag={2}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  randomScreenView: {},
  randomScreenHeaderSpace: {
    flex: theme.headerSpace,
    backgroundColor: theme.psColor,
  },
});
