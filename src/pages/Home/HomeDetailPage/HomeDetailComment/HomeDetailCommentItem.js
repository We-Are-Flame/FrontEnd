/** @format */

import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import SchoolAuthMark from "../../../../components/SchoolAuthMark";
import userStore from "../../../../store/userStore";

export default function HomeDetailCommentItem({ data }) {
  const [secondsPast, setSecondsPast] = useState("");
  const { userData, isLogin } = userStore();

  useEffect(() => {
    const timeStamp = new Date(data.created_at);
    const now = new Date();
    const seconds = (now.getTime() - timeStamp.getTime()) / 1000;

    // 1분 미만
    if (seconds < 60) {
      setSecondsPast(parseInt(seconds) + "초 전");
    } else if (seconds < 3600) {
      setSecondsPast(parseInt(seconds / 60) + "분 전");
    } else if (seconds < 86400) {
      setSecondsPast(parseInt(seconds / 3600) + "시간 전");
    } else if (seconds < 604800) {
      setSecondsPast(parseInt(seconds / 86400) + "일 전");
    } else {
      setSecondsPast(
        timeStamp.getDate() +
          "/" +
          (timeStamp.getMonth() + 1) +
          "/" +
          timeStamp.getFullYear()
      );
    }
  }, [data]);

  return (
    <View style={styles.homeDetailCommentItemView}>
      <Image
        style={{
          width: 24,
          height: 24,
          borderRadius: 50,
        }}
        source={data.profile_image}
        contentFit="cover" // 또는 fill
      />

      <Text
        style={{
          alignItems: "center",
          fontWeight: "bold",
          flexGrow: 0,

          marginLeft: 3,
        }}
      >
        {data.nickname}
      </Text>

      {data.is_school_email ? (
        <SchoolAuthMark width={30} height={30} />
      ) : (
        <View style={{ width: 30 }} />
      )}

      <Text style={{ flex: 8 }}>{data.description}</Text>
      <Text>{secondsPast}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeDetailCommentItemView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
});
