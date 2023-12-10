/** @format */

import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

import theme from "../../../../styles/theme";
import dummy1 from "../../../../../assets/kitchingLogo.png";

import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

export default function HomeContentItem({ state }) {
  const navigation = useNavigation();
  const [duration, setDuration] = useState(0);
  const [timeString, setTimeString] = useState("");
  const [hashtagString, setHashtagString] = useState("");
  const [dateString, setDateString] = useState("");

  const imageSource = state.host.profile_image
    ? { uri: state.host.profile_image }
    : null;
  const startTime = new Date(state.time.start_time);
  const endTime = new Date(state.time.end_time);

  // 시간 차이 계산 (밀리초 단위)
  const diff = endTime - startTime;

  // 밀리초를 시간 단위로 변환
  const hours = diff / 1000 / 60 / 60;

  useEffect(() => {
    setDuration(hours);
  }, [hours]);

  useEffect(() => {
    const hours = startTime.getHours();
    const isPM = hours >= 12;
    const formattedHour = isPM ? hours - 12 : hours;
    const amPmString = isPM ? "오후" : "오전";
    setTimeString(`${amPmString} ${formattedHour}시`);
  }, [startTime]);

  useEffect(() => {
    // 해시태그에 '#'이 붙어있지 않으면 붙이기
    const formattedHashtags = state.hashtags.map((tag) =>
      tag.startsWith("#") ? tag : `#${tag}`
    );

    // 모든 해시태그를 공백으로 구분하여 하나의 문자열로 결합
    setHashtagString(formattedHashtags.join(" "));
  }, [state.hashtags]);

  useEffect(() => {
    const months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    const month = months[startTime.getMonth()]; // getMonth()는 0부터 시작하므로 배열을 사용
    const date = startTime.getDate(); // 일
    const dayOfWeek = days[startTime.getDay()]; // 요일

    // 최종 문자열 생성
    setDateString(`${month} ${date}일(${dayOfWeek})`);
  }, [startTime]);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("HomeDetailPage", {
          id: state.id,
          hostName: state.host.name,
          title: state.info.title,
        });
      }}
    >
      <View style={styles.homeContentItemView}>
        <View style={styles.homeContentItemTitle}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={imageSource}
              style={{ width: 24, height: 24 }} // 예시 크기, 원하는 대로 조절
              contentFit="cover" // 또는 "contain", "stretch" 등
            />
            <Text style={styles.homeContentItemTitleNickname}>
              {state.host.name}
            </Text>
          </View>
        </View>
        <View style={styles.homeContentItemContent}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {state.info.title}
          </Text>
          <View>
            <Text style={{ color: "#848484", marginLeft: 50 }}>
              {timeString}
            </Text>
            <Text
              style={{ color: theme.psColor, fontWeight: "bold", fontSize: 20 }}
            >
              {dateString}
            </Text>
          </View>
        </View>
        <View style={styles.homeContentItemImage}>
          <Image
            style={{
              width: "100%",
              height: "50%",
              borderRadius: 10,
              marginBottom: 10,
            }}
            source={state.thumbnail_url || dummy1}
            contentFit="cover" // 또는 fill
          />
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="place" size={24} color="black" />
            <Text style={{ marginTop: 5 }}>
              &nbsp;{state.location.location}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 3, marginTop: 5 }}>
            <AntDesign name="clockcircle" size={18} color="black" />
            <Text style={{ marginTop: 2, marginLeft: 3 }}>
              &nbsp;{duration}시간
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 3, marginTop: 5 }}>
            <Ionicons name="people" size={20} color="black" />
            <Text style={{ marginTop: 3 }}>
              &nbsp;{state.info.current_participants}/
              {state.info.max_participants}
            </Text>
          </View>
          <Text style={{ marginTop: 10, color: theme.psColor }}>
            {hashtagString}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  homeContentItemView: {
    margin: 20,
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    flex: 1,
    height: 350,
    width: Dimensions.get("window").width - 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  homeContentItemTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  homeContentItemTitleNickname: {
    marginTop: 5,
    marginLeft: 5,
  },
  homeContentItemContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  homeContentItemImage: {
    flex: 5,
  },
});
