/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import theme from "../../../styles/theme";
import { useNavigation } from "@react-navigation/core";

import { Button, Card } from "react-native-paper";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import userStore from "../../../store/userStore";
export default function ClubCard({ clubData }) {
  const { userData } = userStore();
  const navigation = useNavigation();

  const getTime = (dateString) => {
    const dateObject = new Date(dateString);
    const timeString = dateObject.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return timeString;
  };
  return (
    <Card
      onPress={() => {
        navigation.navigate("HomeDetailPage", {
          id: clubData.id,
          hostName: userData.nickname,
        });
      }}
      style={styles.manageCard}
    >
      <View style={{ flexDirection: "row", ...theme.centerStyle }}>
        <View style={styles.cardCoverContainer}>
          <Card.Cover
            style={styles.cardImageStyle}
            source={{
              uri: clubData.thumbnail_url
                ? clubData.thumbnail_url
                : "https://kr.object.ncloudstorage.com/nanum-bucket/20231128155940_kitchingLogo.png",
            }}
          />
        </View>
        <View style={styles.cardContentStyle}>
          <View style={styles.clubContentTop}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "lightgray",
                  fontWeight: "400",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {clubData.location.location}
              </Text>
            </View>
            <View
              style={{
                ...styles.clubState,
                borderColor: theme.psColor,
              }}
            >
              <Text style={{ color: theme.psColor }}>진행중</Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {clubData.info.title}
            </Text>
          </View>

          <Text style={{ flex: 1, fontSize: 14 }}>
            {getTime(clubData.time.start_time)} ~{" "}
            {getTime(clubData.time.end_time)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  clubCardView: {
    flex: 1,

    ...theme.centerStyle,
    padding: 10,
    backgroundColor: "white",
  },
  manageCard: {
    flex: 1,
    width: "100%",
    height: 95,
    padding: 5,
    marginTop: 5,
    backgroundColor: "white",
  },
  clubDate: {
    fontWeight: "600",
    fontSize: 20,
  },
  clubState: {
    borderWidth: 1,
    width: 50,
    height: "100%",
    borderRadius: 5,
    ...theme.centerStyle,
  },
  cardCoverContainer: {
    ...theme.centerStyle,
    flex: 2.4,
    padding: 5,
  },
  cardImageStyle: {
    flexGrow: 0,
    width: "100%",
    height: "100%",
  },
  cardContentStyle: {
    flex: 7.6,
    padding: 5,
    paddingHorizontal: 5,
  },
  clubContentTop: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
