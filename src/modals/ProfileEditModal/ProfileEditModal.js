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
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { AntDesign, EvilIcons, Entypo } from "@expo/vector-icons";
import {
  MediaTypeOptions,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import LionImg from "../../../assets/lion.webp";
import DefaultImg from "../../../assets/user.png";
import theme from "../../styles/theme";
import ImageViewer from "../../components/ImageViewer";
export default function ProfileEditModal({ visible, hideModal, info }) {
  const [nickname, setNickname] = useState(info.nickname);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isNicknameChange, setIsNicknameChange] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [status, requestPermission] = useMediaLibraryPermissions();

  useEffect(() => {
    if (info.nickname === nickname) {
      setIsNicknameChange(false);
    } else {
      setIsNicknameChange(true);
    }
  }, [nickname]);

  const uploadImage = async () => {
    if (!status.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      console.log(result);
      setImageUrl(result.assets[0].uri);
    } else {
      return null;
    }
  };
  const handleNicknameChange = (changeName) => {
    const isValid = validateNickname(changeName);
    setIsNicknameValid(isValid);
    setNickname(changeName);
  };

  const validateNickname = (changeName) => {
    const regex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
    return (
      regex.test(changeName) && changeName.length >= 2 && changeName.length <= 6
    );
  };

  const handleCompletePress = () => {
    if (isNicknameValid && isNicknameChange) {
      console.log("닉네임 유효:", nickname);
      hideModal();
      /* 완료시에 로직 수행*/
    } else {
      console.log("닉네임 유효하지 않음");
    }
  };
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

            <TouchableOpacity
              onPress={handleCompletePress}
              disabled={!isNicknameChange || !isNicknameValid}
            >
              <Text
                style={{
                  fontSize: 19,
                  color:
                    isNicknameValid && isNicknameChange ? "black" : "lightgray",
                }}
              >
                완료
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.modalContent}>
          <View style={styles.imageContainer}>
            <Pressable onPress={uploadImage}>
              <View style={{ position: "relative" }}>
                <ImageViewer
                  placeholderImageSource={DefaultImg}
                  selectedImage={imageUrl}
                />

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
              value={nickname}
              onChangeText={handleNicknameChange}
              maxLength={6}
            />
            {!isNicknameValid && (
              <Text style={{ color: "red", marginTop: 5 }}>
                닉네임은 공백과 특수문자를 제외한 2~6자로 입력해주세요
              </Text>
            )}
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
