/** @format */

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "@env";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

import theme from "../../styles/theme";
import userStore from "../../store/userStore";

import ManageCard from "./ManageCard/ManageCard";

export default function ClubManagePage({ route }) {
  const clubId = route.params.clubId;

  const [checkItems, setCheckItems] = useState(new Set()); // 체크 된 애들을 담는 집합
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [participantList, setParticipantList] = useState({});
  const [pageLoading, setPageLoading] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const { userToken } = userStore();

  const checkItemsHandler = (id, isChecked) => {
    const newCheckItems = new Set(checkItems);
    if (isChecked) {
      newCheckItems.add(id);
    } else {
      newCheckItems.delete(id);
    }
    setCheckItems(newCheckItems);
  };

  async function onMessageReceived(payload) {
    //여기에 알림 묻히기?
    let chat = await JSON.parse(payload.body);
  }

  const TextEncodingPolyfill = require("text-encoding");

  Object.assign("global", {
    TextEncoder: TextEncodingPolyfill.TextEncoder,
    TextDecoder: TextEncodingPolyfill.TextDecoder,
  });

  //채팅방 소켓 연결
  function onConnected(room_id, user_infos) {
    for (let i = 0; i < user_infos.length; i++) {
      stompClient.subscribe("/sub/chat/room/" + room_id, onMessageReceived);

      stompClient.send(
        "/pub/chat/enterUser",
        {},
        JSON.stringify({
          roomId: room_id,
          sender: user_infos[i].nickname,
          senderId: user_infos[i].user_id,
          message: user_infos[i].nickname + "님이 입장하셨습니다.",
          time: new Date(),
          messageType: "ENTER",
        })
      );
    }
  }

  const fetchData = async () => {
    setPageLoading(true);
    const res = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/${clubId}/registrations`,
      {
        headers: {
          "Content-Type": `application/json`,
          Authorization: "Bearer " + `${userToken}`,
        },
      }
    );
    setParticipantList(res.data);
    setPageLoading(false);
  };
  const allCheckHandler = (allCheckToggle) => {
    if (allCheckToggle) {
      const allChecked = new Set(
        participantList.content.map((data, index) => data.id)
      );
      setCheckItems(allChecked);
      setIsAllChecked(true);
    } else {
      setCheckItems(new Set());
      setIsAllChecked(false);
    }
  };
  const sendAcceptList = () => {
    if (checkItems.size < 1) {
      Alert.alert("수락할 신청자를 선택해주세요");
    } else {
      Alert.alert("수락하시겠습니까?", "사용자들이 모임에 초대됩니다.", [
        {
          text: "취소",
          onPress: () => {
            console.log("취소");
          },
        },
        {
          text: "확인",
          onPress: async () => {
            try {
              const res = await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/${clubId}/accept`,
                {
                  registration_ids: Array.from(checkItems),
                },
                {
                  headers: {
                    "Content-Type": `application/json`,
                    Authorization: "Bearer " + `${userToken}`,
                  },
                }
              );
              console.log(res.data);
              console.log("수락");
              setIsUpdate(!isUpdate);
              stompClient = Stomp.over(function () {
                return new SockJS("http://118.67.128.48/ws-stomp");
              });
              stompClient.connect(
                {},
                () => onConnected(res.room_id, res.user_infos),
                {}
              );
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]);
    }
  };
  const sendRejectList = () => {
    // Alert.prompt("거절하시겠습니까?", "사유를 입력해주세요", [
    //   {
    //     text: "취소",
    //     onPress: () => console.log("취소함"),
    //     style: "cancel",
    //   },
    //   {
    //     text: "확인",
    //     onPress: (content) => console.log("OK Pressed, password: " + content),
    //   },
    // ]);
    if (checkItems.size < 1) {
      Alert.alert("거절할 신청자를 선택해주세요");
    } else {
      Alert.alert(
        "선택한 신청자들을 거절하시겠습니까?",
        "대기열에서 제외됩니다",
        [
          {
            text: "취소",
            onPress: () => {
              console.log("취소");
            },
          },
          {
            text: "확인",
            onPress: async () => {
              try {
                const res = await axios.post(
                  `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/${clubId}/reject`,
                  {
                    registration_ids: Array.from(checkItems),
                  },
                  {
                    headers: {
                      "Content-Type": `application/json`,
                      Authorization: "Bearer " + `${userToken}`,
                    },
                  }
                );
                console.log(res);
                console.log("거절");
                setIsUpdate(!isUpdate);
              } catch (err) {
                console.log(err);
              }
            },
          },
        ]
      );
    }
  };
  useEffect(() => {
    fetchData();
  }, [isUpdate]);

  useEffect(() => {
    if (participantList.content && checkItems.size !== participantList.count) {
      setIsAllChecked(false);
    } else {
      setIsAllChecked(true);
    }
  }, [checkItems]);

  return (
    <View style={styles.managePageView}>
      {participantList && participantList.count != 0 ? (
        pageLoading ? (
          <View style={{ flex: 1, ...theme.centerStyle }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <View style={styles.managePageContent}>
            <View style={styles.headerContainer}>
              <View style={styles.headerLeft}>
                <Pressable
                  onPress={() => {
                    setIsAllChecked((prevIsAllChecked) => {
                      const newChecked = !prevIsAllChecked;
                      allCheckHandler(newChecked);
                      return newChecked;
                    });
                  }}
                >
                  {isAllChecked ? (
                    <Ionicons name="checkmark-circle" size={24} color="black" />
                  ) : (
                    <Ionicons name="ellipse-outline" size={24} color="black" />
                  )}
                </Pressable>
                <Text
                  style={{
                    ...styles.headerText,
                    marginLeft: theme.screenWidth / 60,
                  }}
                >
                  전체 {participantList && participantList.count}개
                </Text>
              </View>

              <View style={styles.headerRight}>
                {checkItems.size !== 0 ? (
                  <Pressable onPress={sendRejectList}>
                    <Text style={styles.headerText}>선택 거절</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>

            <ScrollView style={{ flex: 1 }}>
              {participantList.content &&
                participantList.content.map((data, index) => {
                  return (
                    <ManageCard
                      isUpdate={isUpdate}
                      setIsUpdate={setIsUpdate}
                      clubId={clubId}
                      participantData={data}
                      key={index}
                      checkItemsHandler={checkItemsHandler}
                      isAllChecked={isAllChecked}
                    />
                  );
                })}
            </ScrollView>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity onPress={sendAcceptList}>
                <Button
                  style={{
                    borderWidth: 0,
                    height: theme.screenHeight / 15,
                    justifyContent: "center",
                    borderRadius: 5,
                  }}
                  labelStyle={{ fontSize: theme.screenWidth / 25 }}
                  buttonColor={theme.psColor}
                  textColor="white"
                >
                  {checkItems.size}명 수락하기
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        )
      ) : (
        <View
          style={{
            ...styles.managePageContent,
            ...theme.centerStyle,
            marginBottom: theme.screenHeight / 15,
          }}
        >
          <View style={{ marginBottom: theme.screenHeight / 100 }}>
            <Ionicons name="person-add-outline" size={80} color="lightgray" />
          </View>
          <Text style={styles.introudceMsg}>모임에 신청자가 없습니다</Text>
          <Text style={styles.introudceMsg}>사람들을 모아보세요.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  managePageView: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  managePageContent: {
    flex: 1,
    // backgroundColor: "red",
  },
  managePageHeader: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerLeft: { flex: 8, flexDirection: "row", alignItems: "center" },
  headerRight: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerText: { fontSize: 16, fontWeight: "600", textAlignVertical: "bottom" },
  introudceMsg: {
    color: "gray",
    fontSize: theme.screenWidth / 24,
    marginBottom: theme.screenHeight / 200,
  },
});
