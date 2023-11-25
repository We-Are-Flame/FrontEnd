/** @format */

import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState } from "react";

import Header from "../../components/Header";
import theme from "../../styles/theme";
import ManageContentContainer from "./ManageContentContainer/ManageContentContainer";
export default function ClubManagePage() {
  return (
    <View style={styles.managePageView}>
      <View
        style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
      ></View>
      <View style={styles.managePageHeader}>
        <Header />
      </View>
      <View style={styles.managePageContent}>
        <ScrollView style={{ flex: 1 }}>
          <ManageContentContainer />
        </ScrollView>
      </View>
      <View style={{ height: 100 }}></View>
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
    flex: 7,
  },
});
