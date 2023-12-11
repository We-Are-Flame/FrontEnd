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

import {
  MediaTypeOptions,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";

import { Entypo } from "@expo/vector-icons";
import theme from "../../../styles/theme";
import axios from "axios";
import { API_URL } from "@env";

import Chatting from "../Chatting/Chatting";
import userStore from "../../../store/userStore";
import ImageViewer from "../../../components/ImageViewer";

import { Image } from "expo-image";

export default function ChatDetailPage({ route }) {
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [multipleImage, setMultipleImage] = useState([]);
  const [status, requestPermission] = useMediaLibraryPermissions();
  const { userData } = userStore();

  const onMessageReceived = useCallback(async (payload) => {
    let responseChat = await JSON.parse(payload.body);

    setChat((preChat) => [
      ...preChat,
      {
        message_type: responseChat.message_type,
        sender: responseChat.sender,
        time: responseChat.time,
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

  function sendMessage() {
    if (text && stompClient) {
      const chatMessage = {
        roomId: route.params.roomId,
        message: text,
        messageType: "TALK",
      };

      stompClient.send(
        "/pub/chat/sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      //stompClient.send("/pub/chat/sendMessage", {}, JSON.stringify(dummyMessage));
      setText("");
    }
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

  function sendImageMessage() {
    if (multipleImage.length !== 0 && stompClient) {
      for (let i = 0; i < multipleImage.length; i++) {
        console.log("이미지 전송~~");
        const chatMessage = {
          roomId: route.params.roomId,
          message: multipleImage[i],
          messageType: "IMAGE",
        };

        stompClient.send(
          "/pub/chat/sendMessage",
          {},
          JSON.stringify(chatMessage)
        );
      }
    }
  }

  const uploadImage = async () => {
    if (!status.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
      allowsMultipleSelection: true, // 여러 이미지 선택 활성화
    });

    if (!result.canceled) {
      const uploadPromises = result.assets.map(async (asset) => {
        const lastIndex = asset.uri.lastIndexOf(".");
        const extension = asset.uri.substring(lastIndex + 1);

        let res = await axios.post(
          `${API_URL}/api/presigned`,
          {
            image_list: [
              {
                file_name: generateRandomString(10),
                file_type: "image/" + extension,
              },
            ],
          },
          {
            headers: {
              "Content-Type": `application/json`,
            },
          }
        );

        // 이미지의 URI로부터 바이너리 데이터를 가져옵니다.
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        const binaryDataArray = await blobToArrayBuffer(blob);

        if (!res.data.image_list[0].presigned_url) {
          throw new Error("사전 서명된 URL이 비어 있습니다.");
        }

        await axios.put(res.data.image_list[0].presigned_url, binaryDataArray, {
          headers: {
            "Content-Type": "image/" + extension,
          },
        });

        // 업로드된 이미지의 URL을 반환합니다.
        return res.data.image_list[0].image_url;
      });

      try {
        // 여기서 모든 이미지 업로드 프로미스가 완료될 때까지 기다립니다.
        const uploadedImages = await Promise.all(uploadPromises);
        setMultipleImage(uploadedImages);
        sendImageMessage();
      } catch (err) {
        console.error("이미지 업로드 중 오류 발생", err);
      }
    }
  };

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const blobToArrayBuffer = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    if (multipleImage.length > 0) {
      sendImageMessage();
      setMultipleImage([]);
    }
  }, [multipleImage]);

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
            onContentSizeChange={() =>
              this.flatList.scrollToEnd({ animated: true })
            }
            keyExtractor={(item, index) => index.toString()} // 고유 키를 제공
            ref={(ref) => {
              this.flatList = ref;
            }}
          />
        </View>
        <View style={styles.chatInput}>
          <TouchableOpacity style={styles.chatInputImage} onPress={uploadImage}>
            <Entypo name="image" size={30} color="black" />
          </TouchableOpacity>
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
