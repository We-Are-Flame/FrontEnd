/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
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
  const [pageLoading, setPageLoading] = useState(null);
  const ment = [
    "오늘은 이 모임 어떠세요?",
    "찾았다 !",
    "오늘은 여기가 좋겠다 !",
    "나의 불꽃은 여기서?",
    "위대함에 동참하라.",
  ];

  const fetchData = async () => {
    setPageLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/api/meetings?start=0&end=10&sort=soon`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + `${userToken}`,
          },
        }
      );
      setData(res.data.content);
      setPageLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
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
