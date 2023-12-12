import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import theme from "../../styles/theme";
import axios from "axios";
import { API_URL } from "@env";
import HomeContent from "../Home/HomeContent/HomeContent";
import RNPickerSelect from "react-native-picker-select";
import { search_sort } from "../../utils/StaticData";
import searchStore from "../../store/searchStore";
import { sort } from "../../utils/StaticData";
import Loading from "../../components/Loading";
const FirstRoute = ({
  search_sort,
  setSelectedSort,
  titleResult,
  pageLoading,
  selectedSort,
  onEndReached,
}) => {
  return (
    <View style={{ flex: 1 }}>
      {pageLoading ? (
        <Loading />
      ) : titleResult && titleResult.number_of_elements !== 0 ? (
        <FlatList
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
          disableVirtualization={false}
          style={{ flex: 1 }}
          data={[{ key: "sort" }, { key: "content" }]}
          renderItem={({ item }) => (
            <View>
              {item.key === "sort" && (
                <View style={styles.headerContainer}>
                  <View style={styles.pickerSelectContainer}>
                    <RNPickerSelect
                      fixAndroidTouchableBug={true}
                      useNativeAndroidPickerStyle={false}
                      value={selectedSort}
                      style={{
                        ...styles.pickerSelectStyle,
                      }}
                      onValueChange={(value) => setSelectedSort(value)}
                      items={search_sort.map((data, index) => {
                        return { label: data, value: data, key: index };
                      })}
                      placeholder={{}}
                    />
                  </View>
                </View>
              )}
              {item.key === "content" && (
                <View style={styles.homeScreenContent}>
                  <HomeContent clubList={titleResult} />
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1, ...theme.centerStyle }}>
          <Text style={{ fontSize: 16, color: "lightgray" }}>
            검색 결과가 없습니다.
          </Text>
        </View>
      )}
    </View>
  );
};

const SecondRoute = ({
  search_sort,
  setSelectedSort,
  tagResult,
  pageLoading,
  selectedSort,
  onEndReached,
}) => {
  return (
    <View style={{ flex: 1 }}>
      {pageLoading ? (
        <Loading />
      ) : tagResult && tagResult.number_of_elements !== 0 ? (
        <FlatList
          onEndReached={onEndReached}
          onEndReachedThreshold={0.6}
          disableVirtualization={false}
          style={{ flex: 1 }}
          data={[{ key: "sort" }, { key: "content" }]}
          renderItem={({ item }) => (
            <View>
              {item.key === "sort" && (
                <View style={styles.headerContainer}>
                  <View style={styles.pickerSelectContainer}>
                    <RNPickerSelect
                      fixAndroidTouchableBug={true}
                      useNativeAndroidPickerStyle={false}
                      value={selectedSort}
                      style={{
                        ...styles.pickerSelectStyle,
                      }}
                      onValueChange={(value) => setSelectedSort(value)}
                      items={search_sort.map((data, index) => {
                        return { label: data, value: data, key: index };
                      })}
                      placeholder={{}}
                    />
                  </View>
                </View>
              )}
              {item.key === "content" && (
                <View style={styles.homeScreenContent}>
                  <HomeContent clubList={tagResult} />
                </View>
              )}
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1, ...theme.centerStyle }}>
          <Text style={{ fontSize: 16, color: "lightgray" }}>
            검색 결과가 없습니다.
          </Text>
        </View>
      )}
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
  const [selectedSortTitle, setSelectedSortTitle] = useState(search_sort[0]);
  const [selectedSortTag, setSelectedSortTag] = useState(search_sort[0]);
  const [titlePage, setTitlePage] = useState(1);
  const [tagPage, setTagPage] = useState(1);
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [loadingTag, setLoadingTag] = useState(false);
  const [titleResult, setTitleResult] = useState({});
  const [tagResult, setTagResult] = useState({});
  const [pageLoading, setPageLoading] = useState(null);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "제목" },
    { key: "second", title: "해시태그" },
  ]);
  const { searchText } = searchStore();

  const fetchData = async () => {
    setPageLoading(true);
    try {
      const searchTitleResult = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/search?index=0&size=10&sort=${sort[selectedSortTitle]}&title=${searchText}`
      );
      const searchTagResult = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/search?index=0&size=10&sort=${sort[selectedSortTag]}&hashtag=${searchText}`
      );
      setTitleResult(searchTitleResult.data);
      setTagResult(searchTagResult.data);
    } catch (error) {
      console.error("Error:", error);
    }
    setPageLoading(false);
  };

  const continueFetchTitle = async () => {
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/search?index=${titlePage}&size=10&sort=${sort[selectedSortTitle]}&title=${searchText}`
    );
    if (result.data.total_elements === titleResult.content.length) {
      setLoadingTitle(false);
      return;
    }
    setTitleResult((prevList) => {
      return {
        ...prevList,
        content: [...prevList.content, ...result.data.content],
      };
    });
    setTitlePage(titlePage + 1);
    setLoadingTitle(false);
  };

  const continueFetchTag = async () => {
    const result = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/search?index=${tagPage}&size=10&sort=${sort[selectedSortTag]}&hashtag=${searchText}`
    );
    if (result.data.total_elements === tagResult.content.length) {
      setLoadingTag(false);
      return;
    }
    setTagResult((prevList) => {
      return {
        ...prevList,
        content: [...prevList.content, ...result.data.content],
      };
    });
    setTagPage(tagPage + 1);
    setLoadingTag(false);
  };
  const onEndReachedAtTitle = () => {
    if (!loadingTitle) {
      continueFetchTitle();
    }
  };
  const onEndReachedAtTag = () => {
    if (!loadingTag) {
      continueFetchTag();
    }
  };
  const renderScene = ({
    route,
    jumpTo,
    selectedSort,
    setSelectedSort,
    search_sort,
    titleResult,
    pageLoading,
  }) => {
    switch (route.key) {
      case "first":
        return (
          <FirstRoute
            search_sort={search_sort}
            jumpTo={jumpTo}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            titleResult={titleResult}
            pageLoading={pageLoading}
            onEndReached={onEndReachedAtTitle}
          />
        );
      case "second":
        return (
          <SecondRoute
            search_sort={search_sort}
            jumpTo={jumpTo}
            selectedSort={selectedSortTag}
            setSelectedSort={setSelectedSortTag}
            tagResult={tagResult}
            pageLoading={pageLoading}
            onEndReached={onEndReachedAtTag}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedSortTitle, selectedSortTag]);
  useEffect(() => {
    console.log(selectedSortTitle);
  }, [selectedSortTitle]);
  return (
    <View style={styles.searchContentView}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={(props) =>
          renderScene({
            ...props,
            selectedSort: selectedSortTitle,
            setSelectedSort: setSelectedSortTitle,
            search_sort,
            titleResult,
            pageLoading,
          })
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
