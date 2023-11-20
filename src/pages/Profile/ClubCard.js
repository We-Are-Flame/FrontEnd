/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import theme from "../../styles/theme";
import Header from "../Home/Header/Header";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ClubCard() {
  return <View style={styles.clubCardView}></View>;
}

const styles = StyleSheet.create({
  clubCardView: {
    flex: 1,
    backgroundColor: "white",
  },
});
