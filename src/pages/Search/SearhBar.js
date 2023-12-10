/** @format */

import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import theme from "../../styles/theme";

import searchStore from "../../store/searchStore";

export default function SearchBar() {
  const { searchText, setSearchText, setShowResult } = searchStore();

  return (
    <View style={styles.searchBarView}>
      <TextInput
        placeholder="태그, 제목 검색"
        value={searchText}
        onChangeText={(searchText) => {
          setSearchText(searchText);
          setShowResult(false);
        }}
        returnKeyType="search"
        onSubmitEditing={() => {
          if (searchText.trim() === "") {
            return;
          }
          setShowResult(true);
        }}
        style={styles.inputTextStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarView: { width: 300, height: "100%", justifyContent: "center" },
  randomScreenHeaderSpace: {
    flex: theme.headerSpace,
    backgroundColor: theme.psColor,
  },
  inputTextStyle: {
    fontSize: 16,
    height: "85%",
    backgroundColor: "#F2F3F6",
    borderRadius: 5,
    padding: 10,
  },
});
