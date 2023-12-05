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
  const [pageLoading, setPageLoading] = useState(false);
  const { userToken } = userStore();

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
    console.log(res.data.content);
    setPageLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={{ marginTop: 40 }}
              data={data}
              renderItem={({ item, index }) => (
                <ChatItem chatData={item} key={index} />
              )}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            />
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
});
