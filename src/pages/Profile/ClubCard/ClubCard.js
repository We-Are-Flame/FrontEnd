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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "lightgray",
                fontWeight: "400",
              }}
            >
              {clubData.location.location}
            </Text>
            <View
              style={{
                ...styles.clubState,
                borderColor: theme.psColor,
              }}
            >
              <Text style={{ color: theme.psColor }}>참가중</Text>
            </View>
          </View>

          <Text style={{ flex: 1, fontWeight: "600", fontSize: 16 }}>
            {clubData.info.title}
          </Text>

          <Text style={{ flex: 1, fontSize: 14 }}>
            {clubData.time.start_time}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  clubCardView: {
    ...theme.centerStyle,
    padding: 10,
    backgroundColor: "white",
  },
  manageCard: {
    width: "100%",
    height: theme.screenHeight / 10,
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
  cardImageStyle: { flexGrow: 0, width: "100%", height: "100%" },
  cardContentStyle: {
    flex: 7.6,
    padding: 5,
    paddingHorizontal: 5,
  },
});
