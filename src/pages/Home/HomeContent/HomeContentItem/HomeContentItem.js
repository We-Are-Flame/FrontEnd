/** @format */

import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

import theme from "../../../../styles/theme";
import dummy1 from "../../../../../assets/dummyImage.jpg";
import dummy2 from "../../../../../assets/dummyImage2.jpg";
import dummy3 from "../../../../../assets/dummyImage3.jpg";
import dummy4 from "../../../../../assets/dummyImage4.jpg";
import { homeDetailData } from "../../../../utils/StaticData";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeContentItem({ state }) {
  const navigation = useNavigation();
  const [detailData, setDetailData] = useState({});

  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });

  useEffect(() => {
    const data = homeDetailData.find((item) => item.id === state.id);

    if (data) {
      setDetailData(data);
    }
  }, [state.id]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("HomeDetailPage", { detailData });
      }}
    >
      <View style={styles.homeContentItemView}>
        <View style={styles.homeContentItemTitle}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.homeContentItemTitleNickname}>
              {state.nickname}
            </Text>
          </View>
          <AntDesign name="ellipsis1" size={24} color="black" />
        </View>
        <View style={styles.homeContentItemContent}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {state.title}
          </Text>
          <View>
            <Text style={{ color: "#848484", marginLeft: 50 }}>
              {state.hour}
            </Text>
            <Text
              style={{ color: theme.psColor, fontWeight: "bold", fontSize: 20 }}
            >
              {state.date}
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
            source={
              state.id === 1
                ? dummy1
                : state.id === 2
                ? dummy2
                : state.id === 3
                ? dummy3
                : dummy4
            }
            contentFit="cover" // 또는 fill
          />
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="place" size={24} color="black" />
            <Text style={{ marginTop: 5 }}>&nbsp;{state.place}</Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 3, marginTop: 5 }}>
            <AntDesign name="clockcircle" size={18} color="black" />
            <Text style={{ marginTop: 2, marginLeft: 3 }}>
              &nbsp;{state.time}시간 게임
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 3, marginTop: 5 }}>
            <Ionicons name="people" size={20} color="black" />
            <Text style={{ marginTop: 3 }}>
              &nbsp;{state.people}/{state.recruit}
            </Text>
          </View>
          <Text style={{ marginTop: 10, color: theme }}>{state.hashtag}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
