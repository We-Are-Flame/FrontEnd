/** @format */

import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useState } from "react";

import theme from "../../styles/theme";
import { Ionicons } from "@expo/vector-icons";

import ManageCard from "./ManageContentItem/ManageCard/ManageCard";
export default function ClubManagePage() {
  const [isSelect, setIsSelect] = useState();
  return (
    <View style={styles.managePageView}>
      <View style={styles.managePageContent}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View style={styles.headerLeft}>
              {isSelect ? (
                <Ionicons name="checkmark-circle" size={24} color="black" />
              ) : (
                <Ionicons name="ellipse-outline" size={24} color="black" />
              )}
              <Text
                style={{
                  ...styles.headerText,
                  marginLeft: theme.screenWidth / 60,
                }}
              >
                전체 4개
              </Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerText}>선택 거절</Text>
            </View>
          </View>

          <ScrollView style={{ flex: 1 }}>
            <ManageCard />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  managePageView: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  managePageContent: {
    flex: 1,
    // backgroundColor: "red",
  },
  managePageHeader: {
    flex: 1,
  },
  headerLeft: { flex: 8, flexDirection: "row", alignItems: "center" },
  headerRight: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerText: { fontSize: 16, fontWeight: "600", textAlignVertical: "bottom" },
});
