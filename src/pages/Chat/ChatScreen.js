import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { TextInput } from "react-native-paper";
import Header from "./../../components/Header";
import theme from "./../../styles/theme";

import ChatItem from "./ChatItem/ChatItem";
import axios from "axios";
import userStore from "../../store/userStore";
import { Image } from "expo-image";

import Spinner from "../../../assets/loading_spinner.svg";

export default function ChatScreen({ navigation }) {
  const [data, setData] = useState([]);

  const { userToken } = userStore();

  useEffect(() => {
    axios
      .get(`http://118.67.128.48/api/chat/rooms`, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: "Bearer " + `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.content);
        setData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.chatScreenView}>
      <View
        style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
      ></View>

      <Header />
      <View style={{ flex: 7, backgroundColor: "#ffffff" }}>
        <FlatList
          style={{ marginTop: 40 }}
          data={data}
          renderItem={({ item, index }) => (
            <ChatItem chatData={item} key={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
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
