/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import theme from "../../styles/theme";
import ClubImg from "../../../assets/dummyImage.jpg";
import { Button, Card } from "react-native-paper";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ClubCard() {
  return (
    <View style={styles.clubCardView}>
      <View style={{ width: "90%", marginTop: 10 }}>
        <Text style={styles.clubDate}>2023년 9월 30일 (토)</Text>
        <Card style={styles.manageCard}>
          <View style={{ flexDirection: "row", ...theme.centerStyle }}>
            <View style={styles.cardCoverContainer}>
              <Card.Cover style={styles.cardImageStyle} source={ClubImg} />
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
                  금오공과대학교 운동장
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
                축구 한겜 하실분
              </Text>

              <Text style={{ flex: 1, fontSize: 14 }}>
                오후 6:50 ~ 오후 10:50
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
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
