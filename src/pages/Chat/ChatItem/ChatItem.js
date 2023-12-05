/** @format */

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Image } from "expo-image";
import { Octicons } from "@expo/vector-icons";

import kitchingLogo from "../../../../assets/kitchingLogo.png";
const screenWidth = Dimensions.get("window").width;

export default function ChatItem({ chatData }) {
  const navigation = useNavigation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(
      date
    );

    // '오전/오후'를 'AM/PM' 대신 사용하기 위해 변환합니다.
    return formattedDate.replace("AM", "오전").replace("PM", "오후");
  };

  const DateTimeDisplay = ({ dateString }) => {
    const formattedTime = formatDate(dateString);
    return <Text>{formattedTime}</Text>;
  };

  return (
    <TouchableOpacity
      style={styles.chatItemView}
      onPress={() => {
        navigation.navigate("ChatDetailPage", { roomId: chatData.room_id });
      }}
    >
      <View style={{ flex: 1 }}>
        <Image
          source={chatData.thumbnail_url || kitchingLogo}
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#eeeeee",
            padding: 20,
            borderRadius: 10,
          }}
          resizeMode="cover" // 또는 "contain", "stretch" 등
        />
      </View>
      <View style={styles.chatItemContent}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {chatData.room_name}
          </Text>
          <Text>{chatData.last_message}</Text>
        </View>
        <View>
          <Text style={{ color: "#aaaaaa" }}>
            {chatData.is_notification ? (
              <Octicons name="bell" size={14} color="#aaaaaa" />
            ) : (
              <Octicons name="bell-slash" size={14} color="#aaaaaa" />
            )}
            &nbsp;
            <DateTimeDisplay dateString={chatData.last_date_time} />
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItemView: {
    paddingHorizontal: 20,
    width: screenWidth,
    flexDirection: "row",

    flex: 1,
  },
  chatItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    flex: 9,
  },
});
