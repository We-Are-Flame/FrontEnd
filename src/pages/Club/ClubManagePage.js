/** @format */

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { participateList } from "../../utils/StaticData";
import theme from "../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import ManageCard from "./ManageContentItem/ManageCard/ManageCard";
export default function ClubManagePage() {
  const [isSelect, setIsSelect] = useState();

  const [checkItems, setCheckItems] = useState(new Set()); // 체크 된 애들을 담는 집합
  const [isAllChecked, setIsAllChecked] = useState(false);

  const checkItemsHandler = (id, isChecked) => {
    const newCheckItems = new Set(checkItems);
    if (isChecked) {
      newCheckItems.add(id);
    } else {
      newCheckItems.delete(id);
    }
    setCheckItems(newCheckItems);
  };

  const allCheckHandler = () => {};
  return (
    <View style={styles.managePageView}>
      <View style={styles.managePageContent}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View style={styles.headerLeft}>
              <Pressable
                onPress={() => {
                  setIsSelect(!isSelect);
                }}
              >
                {isSelect ? (
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
                전체 4개
              </Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerText}>선택 거절</Text>
            </View>
          </View>

          <ScrollView style={{ flex: 1 }}>
            {participateList.content.map((data, index) => {
              return (
                <ManageCard
                  data={data}
                  key={index}
                  id={`id` + index}
                  checkItemsHandler={checkItemsHandler}
                />
              );
            })}
          </ScrollView>
          <View style={{ flex: 0.2 }}>
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
  headerLeft: { flex: 8, flexDirection: "row", alignItems: "center" },
  headerRight: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerText: { fontSize: 16, fontWeight: "600", textAlignVertical: "bottom" },
});
