/** @format */

import { StyleSheet, Text, View, ScrollView } from "react-native";

import Header from "../Home/Header/Header";

import { useState } from "react";
import { manageData } from "../../utils/StaticData";
import ManageContentItem from "./components/ManageContentItem";
import ManageContentContainer from "./components/ManageContentContainer";
export default function ClubManagePage() {
  return (
    <View style={styles.managePageView}>
      <View style={styles.managePageHeader}>
        <Header />
      </View>
      <View style={styles.managePageContent}>
        <ManageContentContainer />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  managePageView: {
    flex: 1,
    backgroundColor: "white",
  },
  managePageHeader: {
    flex: 1,
  },
  managePageContent: {
    flex: 6,
  },
});
