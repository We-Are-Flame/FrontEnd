/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Button, Card } from "react-native-paper";
import theme from "../../../../styles/theme";
export default function ManageCard({ state, flag, onAccept, onReject }) {
  return (
    <View style={{ ...styles.manageCard, width: flag ? "98%" : "100%" }}>
      {state ? (
        <Card style={{}}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.cardCoverContainer}>
              <Card.Cover
                style={styles.cardImageStyle}
                source={{ uri: state.img }}
              />
            </View>
            <View style={styles.cardContentStyle}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                {state.nickname}
              </Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 2, justifyContent: "center" }}>
                  <Text>온도</Text>
                  <Text>{state.temper}º</Text>
                </View>
                <View style={{ flex: 8 }}>
                  <Card.Actions>
                    <Button
                      style={{ borderWidth: 0 }}
                      buttonColor={theme.psColor}
                      textColor="white"
                      onPress={() => onAccept(state.id)}
                    >
                      수락
                    </Button>
                    <Button
                      style={{ borderWidth: 0 }}
                      buttonColor="#fa9797"
                      textColor="white"
                      onPress={() => onReject(state.id)}
                    >
                      거절
                    </Button>
                  </Card.Actions>
                </View>
              </View>
            </View>
          </View>
        </Card>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  manageCard: {
    flex: 2,
    marginTop: 5,
  },
  cardCoverContainer: {
    ...theme.centerStyle,
    flex: 2.7,
    padding: 5,
  },
  cardImageStyle: { flexGrow: 0, width: "100%", height: "100%" },
  cardContentStyle: {
    flex: 7.3,
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
});
