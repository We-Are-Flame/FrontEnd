/** @format */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import * as Linking from "expo-linking";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Spinner from "../../../../assets/loading_spinner.svg";
import theme from "../../../styles/theme";
import HomeDetailComment from "./HomeDetailComment/HomeDetailComment";
import HomeDetailCommentInput from "./HomeDetailComment/HomeDetailCommentInput";
import { headers } from "./../../../utils/StaticData";
import GoogleMap from "../../../components/GoogleMap";
import { API_URL } from "@env";

export default function HomeDetailPage({ route }) {
  const [detailData, setDetailData] = useState({});
  const [hashtagString, setHashtagString] = useState("");
  const [dateStirng, setDateString] = useState("");
  const [timeRangeString, setTimeRangeString] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [userToken, setUserToken] = useState("");

  const navigation = useNavigation();
  const stateId = route.params.id;

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const isPM = hours >= 12;
    const formattedHour = isPM ? hours - 12 : hours;
    const amPmString = isPM ? "오후" : "오전";

    // 분이 한 자리 수일 경우 앞에 0을 붙임
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${amPmString} ${formattedHour}:${formattedMinutes}`;
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/meetings/${stateId}`, null, { headers: headers })
      .then((res) => {
        setDetailData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stateId]);

  useEffect(() => {
    if (Object.keys(detailData).length !== 0) {
      // 해시태그에 '#'이 붙어있지 않으면 붙이기
      const formattedHashtags = detailData.hashtags.map((tag) =>
        tag.startsWith("#") ? tag : `#${tag}`
      );

      // 모든 해시태그를 공백으로 구분하여 하나의 문자열로 결합
      setHashtagString(formattedHashtags.join(" "));

      setImageSource(
        detailData.host.profile_image
          ? { uri: detailData.host.profile_image }
          : null
      );
    }
  }, [detailData.hashtags]);

  useEffect(() => {
    if (
      detailData.time &&
      detailData.time.start_time &&
      startTime instanceof Date
    ) {
      const year = startTime.getFullYear(); // 년
      const month = startTime.getMonth() + 1; // 월
      const date = startTime.getDate(); // 일
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      const dayOfWeek = days[startTime.getDay()]; // 요일

      setDateString(`${year}년 ${month}월 ${date}일 (${dayOfWeek})`);
    }
  }, [startTime, detailData]);

  useEffect(() => {
    const formatTimeRange = async () => {
      if (startTime && endTime && Object.keys(detailData).length !== 0) {
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);
        setTimeRangeString(`${formattedStartTime} ~ ${formattedEndTime}`);
      }
    };

    formatTimeRange();
  }, [startTime, endTime, detailData]);

  useEffect(() => {
    if (detailData.time && detailData.time.start_time) {
      setStartTime(new Date(detailData.time.start_time));
      setEndTime(new Date(detailData.time.end_time));
    }
  }, [detailData]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("userAccessToken");
        if (value !== null) {
          setUserToken(value);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return Object.keys(detailData).length !== 0 ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios"
          ? theme.screenHeight / 15
          : theme.screenHeight / 10
      }
    >
      <View style={styles.homeDetailPageView}>
        <View style={styles.homeDetailContentView}>
          <ScrollView style={styles.homeDetailScrollView}>
            <View style={styles.homeDetailTitle}>
              <View style={{ flexDirection: "row" }}>
                {imageSource ? (
                  <Image
                    source={imageSource}
                    style={{
                      width: 24,
                      height: 24,
                      marginTop: 3,
                      marginRight: 5,
                    }} // 예시 크기, 원하는 대로 조절
                    resizeMode="cover" // 또는 "contain", "stretch" 등
                  />
                ) : (
                  <Ionicons name="person" size={24} color="black" />
                )}
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      {detailData.info.title}&nbsp;&nbsp;&nbsp;
                    </Text>
                    <Text
                      style={{
                        color: "#aaaaaa",
                        fontWeight: "bold",
                        fontSize: 10,
                      }}
                    >
                      {detailData.info.category || "스포츠"}
                    </Text>
                  </View>
                  <Text style={{ fontWeight: "bold" }}>
                    {detailData.host.name}
                  </Text>
                </View>
              </View>
              <View></View>
              <View>
                {detailData.status.is_owner ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ClubManagePage")}
                  >
                    <Text style={styles.homeDetailAppManageBtn}>신청관리</Text>
                  </TouchableOpacity>
                ) : (
                  ""
                )}
              </View>
              <View>
                <AntDesign name="ellipsis1" size={30} color="black" />
              </View>
            </View>

            <View style={styles.homeDetailContent}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                {detailData.info.title}
              </Text>
              <Text style={{ marginTop: 10 }}>
                {detailData.info.description}
              </Text>
              <Text style={{ color: theme.psColor }}>{hashtagString}</Text>

              {/* 여기에 종료된게임, 참가신청, 참가취소 버튼 추가 */}
              {detailData.status.is_expire ? (
                <TouchableOpacity style={styles.homeDetailStateBtnGray}>
                  <Text style={styles.homeDetailStateTextGray}>
                    종료된 게임
                  </Text>
                </TouchableOpacity>
              ) : detailData.status.participate_status === "NONE" ? (
                <TouchableOpacity style={styles.homeDetailStateBtnBlue}>
                  <Text style={styles.homeDetailStateTextBlue}>참가 신청</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.homeDetailStateBtnRed}>
                  <Text style={styles.homeDetailStateTextRed}>참가 취소</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.homeDetailSpace} />

            <View style={styles.homeDetailInformation}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row", flex: 4 }}>
                  <AntDesign name="calendar" size={24} color="black" />
                  <Text style={styles.informationFormmat}>날짜</Text>
                </View>
                <Text style={{ ...styles.informationFormmat, flex: 6 }}>
                  {dateStirng}
                </Text>
              </View>
            </View>

            <View style={styles.homeDetailInformation}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row", flex: 4 }}>
                  <AntDesign name="clockcircle" size={24} color="black" />
                  <Text style={styles.informationFormmat}>시간</Text>
                </View>
                <Text style={{ ...styles.informationFormmat, flex: 6 }}>
                  {timeRangeString}
                </Text>
                <Text></Text>
              </View>
            </View>

            <View style={styles.homeDetailInformation}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row", flex: 4 }}>
                  <Ionicons name="people" size={24} color="black" />
                  <Text style={styles.informationFormmat}>모집인원</Text>
                </View>
                <Text style={{ ...styles.informationFormmat, flex: 6 }}>
                  {detailData.info.current_participants} /{" "}
                  {detailData.info.max_participants}
                </Text>
                <Text></Text>
              </View>
            </View>

            <View style={styles.homeDetailInformation}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row", flex: 4 }}>
                  <MaterialIcons name="place" size={24} color="black" />
                  <Text style={styles.informationFormmat}>위치</Text>
                </View>
                <Text
                  style={{
                    ...styles.informationFormmat,
                    flex: 6,
                  }}
                >
                  {`${detailData.location.location} ${detailData.location.detail_location}`}
                </Text>
                <Text></Text>
              </View>
            </View>

            <View style={styles.homeDetailMap}>
              <GoogleMap />
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  ...theme.centerStyle,
                  backgroundColor: "#f5f5f5",
                  height: 60,
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ flex: 8, color: theme.psColor, fontWeight: "bold" }}
                >
                  {detailData.location.location}
                </Text>
                <View
                  style={{
                    flex: 2,
                    height: 35,
                    borderRadius: 20,
                    backgroundColor: "#ffffff",
                    ...theme.centerStyle,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      Linking.openURL(
                        `http://maps.google.com/?q=${detailData.location.location}`
                      );
                    }}
                  >
                    <Text
                      style={{
                        color: theme.psColor,
                      }}
                    >
                      길찾기
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.homeDetailSpace} />

            <HomeDetailComment id={stateId} />
          </ScrollView>
        </View>
        <HomeDetailCommentInput id={stateId} token={userToken} />
      </View>
    </KeyboardAvoidingView>
  ) : (
    <Image
      source={Spinner}
      contentFit="cover" // 또는 fill
    />
  );
}

const styles = StyleSheet.create({
  homeDetailPageView: {
    flex: 1,
  },
  homeDetailHeaderView: {
    flex: 1,
  },
  homeDetailContentView: {
    flex: 8,
  },
  homeDetailTitle: {
    padding: 10,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  homeDetailAppManageBtn: {
    backgroundColor: theme.psColor,
    color: "#ffffff",
    padding: 5,
    borderRadius: 20,
    width: 80,
    fontWeight: "bold",
    textAlign: "center",
  },
  homeDetailContent: {
    backgroundColor: "#ffffff",
    padding: 10,
    // borderBottomWidth: 1, // 하단 테두리의 두께
    // borderBottomColor: "#cccccc", // 하단 테두리의 색상
  },
  homeDetailInformation: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderBottomWidth: 1, // 하단 테두리의 두께
    borderBottomColor: "#cccccc", // 하단 테두리의 색상
  },
  informationFormmat: {
    fontWeight: "bold",
    marginTop: 3,
    marginLeft: 5,
  },
  homeDetailMap: {
    ...theme.centerStyle,
    backgroundColor: "#ffffff",
    padding: 10,
    height: 200,
  },
  homeDetailStateBtnGray: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    ...theme.centerStyle,
  },
  homeDetailStateTextGray: {
    color: "#cccccc",
  },
  homeDetailStateBtnBlue: {
    borderWidth: 1,
    borderColor: theme.psColor,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    ...theme.centerStyle,
  },
  homeDetailStateTextBlue: {
    color: theme.psColor,
  },
  homeDetailStateBtnRed: {
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    ...theme.centerStyle,
  },
  homeDetailStateTextRed: {
    color: "#ff0000",
  },
  homeDetailSpace: {
    backgroundColor: "#f5f5f5",
    height: 10,
  },
});
