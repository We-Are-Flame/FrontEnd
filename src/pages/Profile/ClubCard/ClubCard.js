/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import theme from "../../../styles/theme";
import { useNavigation } from "@react-navigation/core";

import { Button, Card } from "react-native-paper";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import kitchingLogoSmall from "../../../../assets/kitchingLogoSmall.jpg";
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
  const setStatusColor = () => {
    switch (clubData.status) {
      case "IN_PROGRESS":
        return "red";
      case "FINISHED":
        return "lightgray";
      case "NOT_STARTED":
        return theme.psColor;
    }
  };
  const setStatusText = () => {
    switch (clubData.status) {
      case "IN_PROGRESS":
        return "진행중";
      case "FINISHED":
        return "종료";
      case "NOT_STARTED":
        return "시작전";
    }
  };

  const statusColor = setStatusColor();
  const statusText = setStatusText();

  return (
    <Card
      onPress={() => {
        navigation.navigate("HomeDetailPage", {
          id: clubData.id,
          hostName: userData.nickname,
          title: clubData.info_output.title,
        });
      }}
      style={styles.manageCard}
    >
      <View style={{ flexDirection: "row", ...theme.centerStyle }}>
        <View style={styles.cardCoverContainer}>
          {clubData.thumbnail_url ? (
            <Card.Cover
              style={styles.cardImageStyle}
              source={{ uri: clubData.thumbnail_url }}
            />
          ) : (
            <Card.Cover
              style={styles.cardImageStyle}
              source={kitchingLogoSmall}
            />
          )}
        </View>
        <View style={styles.cardContentStyle}>
          <View style={styles.clubContentTop}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={styles.clubLocationText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {clubData.location_output.location}
              </Text>
            </View>
            <View
              style={{
                ...styles.clubState,
                borderColor: statusColor,
              }}
            >
              <Text
                style={{
                  color: statusColor,
                }}
              >
                {statusText}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <Text numberOfLines={1} style={{ fontWeight: "600", fontSize: 18 }}>
              {clubData.info_output.title}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ fontSize: 14 }}>
              {`${getTime(clubData.time_output.start_time)}~${getTime(
                clubData.time_output.end_time
              )}`}
            </Text>

            {clubData.hashtags.length > 0 && <Text> · </Text>}

            {clubData.hashtags.length > 0 && (
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1}>
                  {clubData.hashtags.map((data, index) => data + " ")}
                </Text>
              </View>
            )}
          </View>
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
  clubLocationText: { fontSize: 16, color: "lightgray", fontWeight: "400" },
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
