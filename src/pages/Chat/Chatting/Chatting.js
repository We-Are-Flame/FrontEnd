import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import kitchingLogo from "../../../../assets/kitchingLogo.png";
import { Image } from "expo-image";
import userStore from "../../../store/userStore";
import theme from "../../../styles/theme";

export default function Chatting({ data }) {
  const { userData } = userStore();

  function formatTime(dateString) {
    const date = new Date(dateString);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // 12시간제로 표시
    };
    const timeString = new Intl.DateTimeFormat("ko-KR", options).format(date);
    return timeString;
  }

  if (data.message_type !== "TALK") {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#aaaaaa" }}>{data.message}</Text>
      </View>
    );
  } else if (
    data.message_type === "TALK" &&
    data.sender === userData.nickname
  ) {
    return (
      <View
        style={{
          alignItems: "flex-end",
          marginRight: 20,
          flexDirection: "row",
          alignSelf: "flex-end",
        }}
      >
        <View>
          <Text
            style={{
              color: "#cccccc",
              fontSize: 12,
              marginTop: 30,
            }}
          >
            {formatTime(data.time)}
          </Text>
        </View>
        <View style={styles.myChatContainer}>
          <Text
            style={{
              color: "#ffffff",
            }}
          >
            {data.message}
          </Text>
        </View>
      </View>
    );
  } else if (
    data.message_type === "TALK" &&
    userData.nickname !== data.sender
  ) {
    return (
      <View
        style={{
          alignItems: "flex-start",
          marginLeft: 20,
          flexDirection: "row",
          alignSelf: "flex-start",
        }}
      >
        <Image
          source={data.profile_image || kitchingLogo}
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#eeeeee",
            padding: 20,
            borderRadius: 10,
          }}
          contentFit="cover" // 또는 "contain", "stretch" 등
        />
        <View>
          <Text style={{ marginLeft: 5, fontSize: 12 }}>{data.sender}</Text>
          <View style={styles.otherChatContainer}>
            <Text
              style={{
                backgroundColor: "#dddddd",
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30,
                borderTopRightRadius: 30,
              }}
            >
              {data.message}
            </Text>
          </View>
        </View>
        <View style={{}}>
          <Text
            style={{
              color: "#cccccc",
              fontSize: 12,
              marginTop: 40,
            }}
          >
            {formatTime(data.time)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  myChatContainer: {
    padding: 10,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: theme.psColor,
    maxWidth: "70%",
    flexShrink: 1,
    marginTop:5,
  },
  otherChatContainer: {
    marginLeft: 3,
    backgroundColor: "#dddddd",
    padding: 10,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    maxWidth: "70%",
    flexShrink: 1,
  },
});
