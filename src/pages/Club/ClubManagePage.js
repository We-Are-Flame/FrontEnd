/** @format */

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useEffect, useInsertionEffect, useState } from "react";
import { Button } from "react-native-paper";
import { participateList } from "../../utils/StaticData";
import theme from "../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import ManageCard from "./ManageContentItem/ManageCard/ManageCard";
import axios from "axios";
import userStore from "../../store/userStore";
import { API_URL } from "@env";
export default function ClubManagePage({ route }) {
  const clubId = route.params.clubId;

  const [checkItems, setCheckItems] = useState(new Set()); // 체크 된 애들을 담는 집합
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [participantList, setParticipantList] = useState({});

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

  const allCheckHandler = (allCheckToggle) => {
    if (allCheckToggle) {
      const allChecked = new Set(
        participantList.content.map((data, index) => `id` + index)
      );
      setCheckItems(allChecked);
      setIsAllChecked(true);
    } else {
      setCheckItems(new Set());
      setIsAllChecked(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/meetings/${clubId}/registrations`, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: "Bearer " + `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setParticipantList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.managePageView}>
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
            <Pressable>
              <Text style={styles.headerText}>선택 거절</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          {participantList.content &&
            participantList.content.map((data, index) => {
              return (
                <ManageCard
                  participantData={data}
                  key={index}
                  id={`id` + index}
                  checkItemsHandler={checkItemsHandler}
                  isAllChecked={isAllChecked}
                />
              );
            })}
        </ScrollView>
        <View style={{ flex: 0.5 }}>
          <TouchableOpacity>
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
});
