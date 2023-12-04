import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

import { Entypo } from "@expo/vector-icons";
import theme from "../../../styles/theme";
import axios from "axios";
import { API_URL } from "@env";

import Chatting from "../Chatting/Chatting";
import userStore from "../../../store/userStore";

export default function ChatDetailPage({ route }) {
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { userData } = userStore();

  const onMessageReceived = useCallback(async (payload) => {
    let responseChat = await JSON.parse(payload.body);
    setChat((preChat) => [
      ...preChat,
      {
        message_type: responseChat.message_type,
        sender: responseChat.sender,
        time: new Date(),
        message: responseChat.message,
        profile_image: responseChat.profile_image,
      },
    ]);
  });

  const TextEncodingPolyfill = require("text-encoding");

  Object.assign("global", {
    TextEncoder: TextEncodingPolyfill.TextEncoder,
    TextDecoder: TextEncodingPolyfill.TextDecoder,
  });

  function sendMessage(event) {
    if (text && stompClient) {
      const chatMessage = {
        roomId: route.params.roomId,
        sender: userData.nickname,
        senderId: 8,
        message: text,
        time: new Date(),
        messageType: "TALK",
      };

      //   const dummyMessage = {
      //     roomId: route.params.roomId,
      //     sender: "박준하",
      //     senderId: 9,
      //     message: "나는 바보다",
      //     time: new Date(),
      //     messageType: 'TALK'
      // };

      stompClient.send(
        "/pub/chat/sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      //stompClient.send("/pub/chat/sendMessage", {}, JSON.stringify(dummyMessage));
      setText("");
    }
    event.preventDefault();
  }

  function onConnected() {
    stompClient.subscribe(
      "/sub/chat/room/" + route.params.roomId,
      onMessageReceived
    );

    stompClient.send(
      "/pub/chat/enterUser",
      {},
      JSON.stringify({
        roomId: route.params.roomId,
        sender: userData.nickname,
        senderId: 8,
        message: userData.nickname + "님이 입장하셨습니다.",
        time: new Date(),
        messageType: "ENTER",
      })
    );
  }

  useEffect(() => {
    axios
      .get(`${API_URL}/api/chat/${route.params.roomId}/messages`, null, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        setChat(res.data.content);
        console.log(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [route.params]);

  const renderItem = ({ item }) => {
    return <Chatting data={item} />;
  };

  useEffect(() => {
    stompClient = Stomp.over(function () {
      return new SockJS("http://118.67.128.48/ws-stomp");
    });
    stompClient.connect({}, onConnected, {});
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios"
          ? theme.screenHeight / 10
          : theme.screenHeight / 10
      }
    >
      <View style={styles.chatDetailPageView}>
        <View style={styles.chatContent}>
          <FlatList
            style={styles.chatContent}
            data={chat}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()} // 고유 키를 제공
          />
          {/* {
          msg.map((data,key)=>{
            return <Chatting data={data} key={key} />
          })
        } */}
        </View>
        <View style={styles.chatInput}>
          <View style={styles.chatInputImage}>
            <Entypo name="image" size={30} color="black" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Message"
            onChangeText={setText}
            value={text}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
          {isFocused && (
            <TouchableOpacity
              onPress={sendMessage}
              style={styles.chatInputImage}
            >
              <Text
                style={{
                  color: theme.psColor,
                  fontWeight: "600",
                  fontSize: theme.screenWidth / 23,
                }}
              >
                전송
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  chatDetailPageView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 8,
  },
  chatInput: {
    flexDirection: "row",
  },
  chatInputImage: {
    padding: 10,
    flex: 1,
    ...theme.centerStyle,
  },
  chatContent: {},
});
