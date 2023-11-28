/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../../styles/theme";
import ProfileEditModal from "../../../modals/ProfileEditModal/ProfileEditModal";
import userStore from "../../../store/userStore";
import modalHandleStore from "../../../store/modalHandleStore";
export default function MyProfile({ userInfo, setUpdated }) {
  const { profileEditModal, setProfileEditModal } = modalHandleStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { userData } = userStore();

  return (
    <View style={styles.myProfileView}>
      <View style={styles.myProfileViewTop}>
        <View style={styles.myProfileImgContainer}>
          <Image
            style={styles.image}
            source={userData.profile_image}
            contentFit="cover"
          />
        </View>
        <View style={styles.myPrfoileNameContainer}>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {userData.nickname}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.myProfileViewBottom}>
        <View style={styles.myProfileEdit}>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              setProfileEditModal(true);
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              프로필 수정
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.myProfileStat}>
          <View style={{ ...styles.stateItems }}>
            <Text>나의 모임</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {userData.my_meetings} 개
            </Text>
          </View>
          <View style={styles.stateItems}>
            <Text>불꽃온도</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {userData.temperature} º
            </Text>
          </View>
          <View style={{ ...styles.stateItems, borderRightWidth: 0 }}>
            <Text>학교 인증</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: isAuth ? theme.psColor : "gray",
              }}
            >
              {isAuth ? "인증됨" : "인증필요"}
            </Text>
          </View>
        </View>
      </View>
      <ProfileEditModal setUpdated={setUpdated} />
    </View>
  );
}

const styles = StyleSheet.create({
  myProfileView: {
    flex: 1,
    marginHorizontal: theme.screenWidth / 30,
    backgroundColor: "white",
  },
  myProfileImgContainer: {
    flex: 3,
    ...theme.centerStyle,
  },
  myPrfoileNameContainer: {
    flex: 7,
  },
  myProfileViewTop: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "red",
  },
  myProfileViewBottom: {
    flex: 1,
    // backgroundColor: "grey",
  },
  myProfileEdit: { flex: 1.5, ...theme.centerStyle },
  editBtn: {
    borderRadius: 5,
    borderColor: "white",
    backgroundColor: theme.subColor,
    borderWidth: 1,
    width: "100%",
    height: "100%",
    ...theme.centerStyle,
  },
  myProfileStat: {
    flex: 3,
    // backgroundColor: "yellow",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stateItems: {
    borderRightWidth: 1,
    borderColor: theme.subColor,
    height: "80%",
    // backgroundColor: "orange",
    flex: 1,
    ...theme.centerStyle,
  },
  image: {
    // flex: 1,
    borderWidth: 1,
    borderColor: theme.profileBorderColor,
    width: 80,
    height: 80,
    borderRadius: theme.screenWidth / 6,
  },
});
