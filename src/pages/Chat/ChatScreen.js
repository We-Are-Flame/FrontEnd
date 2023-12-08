/** @format */

import { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import Header from "./../../components/Header";
import theme from "./../../styles/theme";

import ChatItem from "./ChatItem/ChatItem";
import axios from "axios";
import userStore from "../../store/userStore";

import { API_URL } from "@env";
import Loading from "../../components/Loading";

export default function ChatScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [chatCount, setChatCount] = useState();
  const [pageLoading, setPageLoading] = useState(false);
  const { userToken, isLogin } = userStore();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      fetchData();
    }, 1000);
  }, []);

  const fetchData = async () => {
    setPageLoading(true);
    const res = await axios.get(`${API_URL}/api/chat/rooms`, {
      headers: {
        "Content-Type": `application/json`,
        Authorization: "Bearer " + `${userToken}`,
      },
    });
    setData(res.data.content);
    setChatCount(res.data.count);
    // console.log(res.data.content);
    setPageLoading(false);
  };

  useEffect(() => {
    if (isLogin) {
      console.log("되는거아님?");
      fetchData();
    }
  }, []);

  useEffect(() => {
    console.log(chatCount);
  }, [chatCount]);

  return (
    <View style={styles.chatScreenView}>
      <View style={{ flex: 1 }}>
        <View
          style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
        ></View>
        <Header />
        <View style={{ flex: 7, backgroundColor: "#ffffff" }}>
          {pageLoading ? (
            <Loading />
          ) : chatCount && chatCount !== 0 ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={{ marginTop: 20 }}
              data={data}
              renderItem={({ item, index }) => (
                <ChatItem chatData={item} key={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            />
          ) : (
            <View style={styles.noChatItemView}>
              <Text style={styles.introudceMsg}>채팅방이 없습니다</Text>

              <Text style={styles.introudceMsg}>
                {isLogin
                  ? "지금 모임에 참여하고 채팅방에서 대화를 나눠보세요!"
                  : "로그인 후 모임에 참여하고 채팅방에서 대화를 나눠보세요!"}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatScreenView: {
    flex: 1,
    backgroundColor: "white",
  },
  chatItemView: {
    marginTop: 40,
    flex: 0.3,
  },
  noChatItemView: { ...theme.centerStyle, flex: 1 },
  introudceMsg: {
    color: "gray",
    fontSize: theme.screenWidth / 24,
    marginBottom: theme.screenHeight / 200,
  },
});
