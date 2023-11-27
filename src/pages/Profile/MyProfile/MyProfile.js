/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../../styles/theme";
import LionProfile from "../../../../assets/lion.webp";
import ProfileEditModal from "../../../modals/ProfileEditModal/ProfileEditModal";

export default function MyProfile({ userInfo }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const info = {
    nickname: "히어로",
    profile:
      "https://i.namu.wiki/i/MIdKf35SuzXJmr3tDx_pRotdE4w0qZXXjjpkOWBRbRMyNrPEqcR1j5qycTSTaan4_zDcWX50JbpCb8jmGIbY9PQuCGff_BpbOjXlNZnZsbglilvkpm2N5INbRTyrZWhQmFq6eqKLQWaYHdoAZEQ98Q.webp",
  };

  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.myProfileView}>
      <View style={styles.myProfileViewTop}>
        <View style={styles.myProfileImgContainer}>
          <Image
            style={styles.image}
            source={userInfo.profile_image}
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
              {userInfo.nickname}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.myProfileViewBottom}>
        <View style={styles.myProfileEdit}>
          <TouchableOpacity style={styles.editBtn} onPress={showModal}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              프로필 수정
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.myProfileStat}>
          <View style={{ ...styles.stateItems }}>
            <Text>나의 모임</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {userInfo.my_meetings} 개
            </Text>
          </View>
          <View style={styles.stateItems}>
            <Text>불꽃온도</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {userInfo.temperature} º
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
      <ProfileEditModal
        userInfo={userInfo}
        visible={modalVisible}
        hideModal={hideModal}
        info={info}
      />
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
