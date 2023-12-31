/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../../styles/theme";
import ProfileEditModal from "../../../modals/ProfileEditModal/ProfileEditModal";
import userStore from "../../../store/userStore";
import modalHandleStore from "../../../store/modalHandleStore";
import { useNavigation } from "@react-navigation/core";
import AuthMark from "../../../../assets/authmark.png";
import SchoolAuthMark from "../../../components/SchoolAuthMark";
import defaultImg from "../../../../assets/defaultImg.jpg";
export default function MyProfile() {
  const { setProfileEditModal } = modalHandleStore();

  const [isAuth, setIsAuth] = useState(false);
  const { isLogin, userData } = userStore();
  const navigation = useNavigation();

  useEffect(() => {
    console.log(userData);
  }, []);
  return (
    <View style={styles.myProfileView}>
      <View style={styles.myProfileViewTop}>
        <View style={styles.myProfileImgContainer}>
          <Image
            style={styles.image}
            source={isLogin ? userData.profile_image : defaultImg}
            contentFit="cover"
          />
        </View>
        <View style={styles.myPrfoileNameContainer}>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: isLogin ? 16 : 18 }}>
              {isLogin
                ? userData.nickname
                : `로그인 후 다양한\n모임에 참여해보세요!`}
            </Text>
            {isLogin && userData.is_school_verified ? (
              <SchoolAuthMark width={36} height={36} />
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.myProfileViewBottom}>
        <View style={styles.myProfileEdit}>
          {isLogin ? (
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
          ) : null}
        </View>
        <View style={styles.myProfileStat}>
          <View style={{ ...styles.stateItems }}>
            <Text>나의 모임</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {isLogin ? userData.my_meetings : 0} 개
            </Text>
          </View>
          <View style={styles.stateItems}>
            <Text>불꽃온도</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {isLogin ? userData.temperature : 0} º
            </Text>
          </View>
          <View style={{ ...styles.stateItems, borderRightWidth: 0 }}>
            <TouchableOpacity
              disabled={!isLogin}
              onPress={() => {
                if (isLogin && userData.is_school_verified) {
                  return;
                }
                navigation.navigate("UnivAuth");
              }}
            >
              <Text>학교 인증</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color:
                    isLogin && userData.is_school_verified
                      ? theme.psColor
                      : "gray",
                }}
              >
                {isLogin
                  ? userData.is_school_verified
                    ? "인증완료"
                    : "인증필요"
                  : "인증필요"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ProfileEditModal />
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
