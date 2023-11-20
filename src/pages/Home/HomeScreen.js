/** @format */

import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity, Alert } from "react-native"; // Alert 추가
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import theme from "../../styles/theme";
import Header from "./Header/Header";
import HomeContent from "./HomeContent/HomeContent";
import HomeCategory from "./HomeCategory/HomeCategory";

import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.homeScreenView}>
      <View style={{ flex: 0.5, backgroundColor: theme.psColor }}></View>
      <View style={styles.homeScreenHeader}>
        <Header />
      </View>
      <View style={{ flex: 7 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.homeScreenCategory}>
            <Text style={styles.homeScreenCategoryText}>카테고리 별로</Text>
            <Text style={styles.homeScreenCategoryText}>확인해 보세요!</Text>
            <HomeCategory />
          </View>
          <View style={styles.homeScreenContent}>
            <HomeContent />
          </View>
        </ScrollView>
      </View>
      <FAB
        style={styles.fab}
        small
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateClubPostPage");
            }}
          >
            <Text style={styles.modalText}>모임 만들기</Text>
            <View style={styles.modalView}>
              {/* 모달 내용 */}
              <Ionicons name="baseball-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>
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
    flex: 1,
  },
  homeScreenCategory: {
    margin: 30,
  },
  homeScreenCategoryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#61D451",
    borderRadius: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalText:{
    position: 'absolute',
    margin: 16,
    right: 70,
    bottom: 200,
    width: '20px',
    height:"20px",
    color:"#ffffff",
    fontWeight:"bold",
    fontSize: 18,
  },
  modalView: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 180,
    width: '20px',
    height:"20px",
    // 모달의 높이, 배경색 등 원하는 스타일을 추가하세요
    backgroundColor: 'white',
    padding: 20,
    // 모달의 둥근 모서리를 위한 스타일
    borderRadius:50,
    // 그림자를 위한 스타일
    shadowColor: '#000',
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
    color: 'black',
    // 텍스트 스타일
  },
});
