/** @format */

import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, TextInput } from "react-native";
import theme from "../../styles/theme";
import axios from "axios";
import userStore from "../../store/userStore";
import { useNavigation } from "@react-navigation/core";
import { API_URL } from "@env";
import searchStore from "../../store/searchStore";
export default function SearchBar() {
  // const [searchText, setSearchText] = useState("");
  const { searchText, setSearchText, setShowResult } = searchStore();
  const navigation = useNavigation();

  const handleSearchSubmit = () => {
    if (searchText === "") {
      console.log("최근검색");
    } else {
      setSubmitText(searchText);
      console.log("검색결과");
    }
  };
  // useEffect(() => {
  //   console.log(searchText);
  // }, [searchText]);
  return (
    <View
      style={{
        width: 300,
        height: "100%",
        justifyContent: "center",
      }}
    >
      <TextInput
        placeholder="태그, 제목 검색"
        value={searchText}
        onChangeText={(searchText) => {
          setSearchText(searchText);
          setShowResult(false);
        }}
        returnKeyType="search"
        onSubmitEditing={() => {
          setShowResult(true);
        }}
        style={{
          fontSize: 16,
          height: "85%",
          backgroundColor: "#F2F3F6",
          borderRadius: 5,
          padding: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  randomScreenView: {},
  randomScreenHeaderSpace: {
    flex: theme.headerSpace,
    backgroundColor: theme.psColor,
  },
});
