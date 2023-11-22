/** @format */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import { AntDesign, EvilIcons, Entypo } from "@expo/vector-icons";

import LionImg from "../../../assets/lion.webp";
import DefaultImg from "../../../assets/user.png";
import theme from "../../styles/theme";
export default function ProfileEditModal({ visible, hideModal }) {
  const nickname = useState();
  return (
    <Modal
      visible={visible}
      contentContainerStyle={styles.modalContainer}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={{ flex: 0.14 }} />
        <View style={styles.modalHeaderContainer}>
          <View style={styles.modalHeader}>
            <Pressable onPress={hideModal}>
              <EvilIcons name="close" size={30} color="black" />
            </Pressable>

            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              프로필 수정
            </Text>

            <TouchableOpacity>
              <Text style={{ fontSize: 19, color: "lightgray" }}>완료</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.modalContent}>
          <View style={styles.imageContainer}>
            <Pressable>
              <View style={{ position: "relative" }}>
                <View style={styles.imageWrapper}>
                  <Image style={styles.image} source={DefaultImg} />
                </View>
                <View style={styles.iconContainer}>
                  <Entypo name="camera" size={17} color="black" />
                </View>
              </View>
            </Pressable>
          </View>
          <View style={{ flex: 0.5, width: "90%", alignSelf: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>닉네임</Text>
            <TextInput
              style={styles.input}
              dataDetectorTypes="phoneNumber"
              placeholder="닉네임을 입력해주세요."
              placeholderTextColor="lightgray"
            />
          </View>
          <View style={{ flex: 2, backgroundColor: "gray" }}></View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  profileEditModalView: {
    flex: 1,
    backgroundColor: "white",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
  },

  modalHeaderContainer: {
    flex: 0.15,
    // backgroundColor: "red",
    borderBottomWidth: 1,
    borderColor: theme.subColor,
    ...theme.centerStyle,
  },
  modalHeader: {
    flexDirection: "row",
    width: "90%",
    // backgroundColor: "red",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalContent: { flex: 2 },
  imageWrapper: {
    borderWidth: 1,
    borderColor: theme.profileBorderColor,
    width: 100,
    height: 100,
    borderRadius: theme.screenWidth / 6,
    ...theme.centerStyle,
  },
  image: {
    width: 80,
    height: 80,
  },
  imageContainer: {
    flex: 0.5,
    // backgroundColor: "red",
    ...theme.centerStyle,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "white",
    padding: 5,
    borderRadius: "50%",
    borderWidth: 0.5,
    borderColor: theme.profileBorderColor,
  },
  input: {
    marginTop: 10,
    height: 45,
    borderWidth: 1,
    borderColor: theme.profileBorderColor,
    borderRadius: 5,
    padding: 10,
  },
});
