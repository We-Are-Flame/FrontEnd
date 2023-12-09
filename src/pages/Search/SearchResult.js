import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../styles/theme";

import { API_URL } from "@env";

import RNPickerSelect from "react-native-picker-select";
import { search_sort } from "../../utils/StaticData";

const FirstRoute = ({ search_sort, setSelectedSort }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.pickerSelectContainer}>
          <RNPickerSelect
            fixAndroidTouchableBug={true}
            useNativeAndroidPickerStyle={false}
            style={{
              ...styles.pickerSelectStyle,
            }}
            onValueChange={(value) => setSelectedSort(value)}
            items={search_sort.map((data, index) => {
              return { label: data, value: data, key: index };
            })}
            placeholder={{
              label: "최신순",
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1, ...theme.centerStyle }}>
        <Text style={{ fontSize: 16, color: "lightgray" }}>
          생성한 모임이 없습니다.
        </Text>
      </View>
    </View>
  );
};

const SecondRoute = ({ search_sort, setSelectedSort }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, ...theme.centerStyle }}>
        <Text style={{ fontSize: 16, color: "lightgray" }}>
          참여한 모임이 없습니다
        </Text>
      </View>
    </View>
  );
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: theme.psColor }}
    style={{ backgroundColor: "white" }}
    labelStyle={{ color: "black" }}
  />
);

export default function SearchResult() {
  const [selectedSort, setSelectedSort] = useState(search_sort[0]);

  const renderScene = ({
    route,
    jumpTo,
    selectedSort,
    setSelectedSort,
    search_sort,
  }) => {
    switch (route.key) {
      case "first":
        return (
          <FirstRoute
            search_sort={search_sort}
            jumpTo={jumpTo}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        );
      case "second":
        return (
          <SecondRoute
            search_sort={search_sort}
            jumpTo={jumpTo}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        );
      default:
        return null;
    }
  };
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "해시태그" },
    { key: "second", title: "제목" },
  ]);

  return (
    <View style={styles.searchContentView}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={(props) =>
          renderScene({ ...props, selectedSort, setSelectedSort, search_sort })
        }
        onIndexChange={setIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContentView: { backgroundColor: "white", flex: 1 },
  headerContainer: { flexGrow: 0, paddingHorizontal: 20, marginTop: 10 },
  pickerSelectStyle: {
    width: "100%",
    height: "100%",
    inputIOS: {
      ...theme.centerStyle,
      backgroundColor: "white",
      width: "100%",
      height: 40,
      borderRadius: 20,
      color: "black",
      textAlign: "center",
    },
    inputAndroid: {
      ...theme.centerStyle,
      backgroundColor: "white",
      width: "100%",
      height: 40,
      borderRadius: 20,
      color: "black",
      textAlign: "center",
    },
    placeholder: { color: "black" },
  },
  pickerSelectContainer: {
    flexGrow: 0,
    justifyContent: "center",
    width: 90,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: theme.profileBorderColor,
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignSelf: "center",
    height: 40,
  },
});
