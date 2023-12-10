import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import RecentlySearch from "./RecentlySearch";
import SearchResult from "./SearchResult";
import searchStore from "../../store/searchStore";
export default function SearchContent() {
  const { showResult } = searchStore();

  return (
    <View style={styles.searchContentView}>
      {showResult !== true ? <RecentlySearch /> : <SearchResult />}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContentView: { backgroundColor: "white", flex: 1 },
});
