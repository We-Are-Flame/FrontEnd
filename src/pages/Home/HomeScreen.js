/** @format */

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import theme from "../../styles/theme";
import Header from "../../components/Header";
import HomeContent from "./HomeContent/HomeContent";
import HomeCategory from "./HomeCategory/HomeCategory";
import Dropdown from "../../components/Dropdown";
import { sort } from "../../utils/StaticData";

export default function HomeScreen({ isLogin }) {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sort[0]);
  const [loginStatus, setLoginStatus] = useState(isLogin);
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.homeScreenView}>
      <View
        style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
      ></View>

      <Header isLogin={isLogin} />

      <View style={{ flex: 7 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ flex: 1 }}
        >
          <View style={styles.homeScreenCategory}>
            <Text style={styles.homeScreenCategoryText}>카테고리 별로</Text>
            <Text style={styles.homeScreenCategoryText}>확인해 보세요!</Text>
            <HomeCategory />
          </View>
          <View style={styles.homeScreenSort}>
            <Dropdown
              dropDownItem={sort}
              setData={setSelectedSort}
              label="정렬 선택"
              widthProps={150}
            />
          </View>
          <View style={styles.homeScreenContent}>
            <HomeContent selectedSort={selectedSort} />
          </View>
        </ScrollView>
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        color="#ffffff"
        onPress={() => setModalVisible(!modalVisible)} // 'Pressed' 대신에 모달을 열도록 변경
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(!modalVisible)} // 이 부분이 모달 외부를 눌렀을 때 닫히도록 함
        >
          <Text style={styles.modalText}>모임 만들기</Text>

          <View style={styles.modalView}>
            {/* 모달 내용 */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateClubPostPage", {
                  isLogin: loginStatus,
                });
                setModalVisible(false);
              }}
              hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
            >
              <Ionicons name="baseball-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenView: {
    flex: 1,
  },
  homeScreenHeader: {
    flex: 0.8,
    backgroundColor: theme.psColor,
  },
  homeScreenCategory: {
    margin: 30,
    marginBottom: 0,
  },
  homeScreenCategoryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    // backgroundColor: "#61D451",
    backgroundColor: theme.psColor,
    borderRadius: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalText: {
    position: "absolute",
    margin: 16,
    right: 70,
    bottom: 200,
    width: "20px",
    height: "20px",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalView: {
    position: "absolute",
    ...theme.centerStyle,
    margin: 16,
    right: 0,
    bottom: 180,
    // width: "20px",
    // height: "20px",
    width: 56,
    height: 56,

    // 모달의 높이, 배경색 등 원하는 스타일을 추가하세요
    backgroundColor: "white",

    // 모달의 둥근 모서리를 위한 스타일
    borderRadius: 30,
    // 그림자를 위한 스타일
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    // 닫기 버튼 스타일
  },
  textStyle: {
    color: "black",
    // 텍스트 스타일
  },
  homeScreenSort: {
    alignItems: "flex-end",
  },
});
