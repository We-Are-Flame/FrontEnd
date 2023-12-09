import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import theme from "../../styles/theme";
import axios from "axios";
import userStore from "../../store/userStore";
import { API_URL } from "@env";
import searchStore from "../../store/searchStore";
import RecentlySearch from "./RecentlySearch";
import { recentData } from "../../utils/StaticData";
import SearchResult from "./SearchResult";

export default function SearchContent() {
  const { searchText, showResult } = searchStore();
  const [datalength, setDataLenght] = useState(1);

  //   useEffect(() => {
  //     console.log(searchText);
  //   }, [searchText]);

  return (
    <View style={styles.searchContentView}>
      {showResult !== true ? <RecentlySearch /> : <SearchResult />}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContentView: { backgroundColor: "white", flex: 1 },
});
