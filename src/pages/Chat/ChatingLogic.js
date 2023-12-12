import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import { TextInput } from "react-native-paper";

export default function ChatingLogic({ navigation }) {
  const [text, setText] = useState([]);
  const [msg, setMsg] = useState("");

  async function onMessageReceived(payload) {
    let chat = await JSON.parse(payload.body);
    setText((preText) => [...preText, chat.message]);
  }

  const TextEncodingPolyfill = require("text-encoding");

  Object.assign("global", {
    TextEncoder: TextEncodingPolyfill.TextEncoder,
    TextDecoder: TextEncodingPolyfill.TextDecoder,
  });

  function onConnected() {
    let roomId = "9ca70134-b3ea-47b3-b2fa-e1e00b3395d0"; //post할때 response값
    let username = "Junad"; //유저 닉네임
    stompClient.subscribe("/sub/chat/room/" + roomId, onMessageReceived);

    stompClient.send(
      "/pub/chat/enterUser",
      {},
      JSON.stringify({
        roomId: roomId,
        sender: username,
        senderId: 2,
        message: username + "님이 입장하셨습니다.",
        time: new Date(),
        messageType: "ENTER",
      })
    );
  }

  function sendMessage(event) {
    let roomId = "9ca70134-b3ea-47b3-b2fa-e1e00b3395d0"; //post할때 response값
    let username = "Junad"; //유저 닉네임

    if (msg && stompClient) {
      const chatMessage = {
        roomId: roomId,
        sender: username,
        senderId: 2,
        message: msg,
        time: new Date(),
        messageType: "TALK",
      };

      stompClient.send(
        "/pub/chat/sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      setMsg("");
    }
    event.preventDefault();
  }

  useEffect(() => {
    stompClient = Stomp.over(function () {
      return new SockJS(`${process.env.EXPO_PUBLIC_API_URL}/ws-stomp`);
    });
    stompClient.connect({}, onConnected, {});
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => {
          navigation.navigate("Home", { isLogin: true });
        }}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Chat Screen
      </Text>
      {text.map((item, index) => {
        return (
          <View style={{ flexDirection: "row" }} key={index}>
            <Text>Junad : </Text>
            <Text>{item}</Text>
          </View>
        );
      })}
      <TextInput onChangeText={setMsg} value={msg} />
      <Button onPress={sendMessage} color="#841584" title="전송" />
    </View>
  );
}
