/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";
import theme from "../../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { API_URL } from "@env";
import userStore from "../../../store/userStore";

export default function ManageCard({
  isUpdate,
  setIsUpdate,
  clubId,
  checkItemsHandler,
  isAllChecked,
  participantData,
}) {
  const { userToken } = userStore();
  const [checked, setChecked] = useState(false);

  const allCheckHandler = () => {
    setChecked(isAllChecked);
    checkItemsHandler(participantData.id, isAllChecked);
  };

  const checkHanlder = () => {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked;
      checkItemsHandler(participantData.id, newChecked);
      return newChecked;
    });
  };
  const rejectHandler = () => {
    Alert.alert("거절하시겠습니까?", "대기열에서 제외됩니다", [
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
              `${API_URL}/api/meetings/${clubId}/reject`,
              {
                registration_ids: [participantData.id],
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
    ]);
  };
  useEffect(() => {
    allCheckHandler();
  }, [isAllChecked]);

  return (
    <View style={styles.manageCardView}>
      <View style={styles.manageCard}>
        <View style={{ justifyContent: "center", flex: 0.4 }}>
          <Pressable onPress={checkHanlder}>
            {checked ? (
              <Ionicons name="checkmark-circle" size={24} color="black" />
            ) : (
              <Ionicons name="ellipse-outline" size={24} color="black" />
            )}
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.image}
            source={{ uri: participantData.profile_image }}
            contentFit="cover"
          />
        </View>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ fontWeight: "600" }}>{participantData.nickname}</Text>
          <Text>온도 {participantData.temperature} º</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={rejectHandler}>
              <Button
                style={{ borderWidth: 0 }}
                buttonColor={theme.btnRejectColor}
                textColor="white"
              >
                거절
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  manageCardView: {
    height: theme.screenHeight / 10,
    // borderWidth: 1
  },
  manageCard: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    borderWidth: 1,
    borderColor: "lightgray",
    width: 60,
    height: 60,
    borderRadius: theme.screenWidth / 6,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
