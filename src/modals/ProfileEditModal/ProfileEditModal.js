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
import { AntDesign, EvilIcons, Entypo } from "@expo/vector-icons";
import {
  MediaTypeOptions,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";

import theme from "../../styles/theme";
import ImageViewer from "../../components/ImageViewer";
import axios from "axios";
import { API_URL } from "@env";

export default function ProfileEditModal({
  visible,
  hideModal,
  userInfo,
  userToken,
  setUpdated,
}) {
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isNicknameChange, setIsNicknameChange] = useState(false);
  const [isProfileImgChange, setIsProfileImgChange] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [status, requestPermission] = useMediaLibraryPermissions();

  useEffect(() => {
    if (userInfo.nickname == nickname) {
      setIsNicknameChange(false);
    } else {
      setIsNicknameChange(true);
    }
  }, [nickname]);
  
  useEffect(() => {
    setNickname(userInfo.nickname);
  }, [userInfo]);

  useEffect(() => {
    if (imageUrl != "") {
      setIsProfileImgChange(true);
    } else {
      setIsProfileImgChange(false);
    }
  }, [imageUrl]);

  const resetState = () => {
    setNickname(userInfo.nickname);
    setIsNicknameValid(true);
    setIsNicknameChange(false);
    setIsProfileImgChange(false);
    setImageUrl("");
  };
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
    if (isNicknameValid && isNicknameChange && isProfileImgChange) {
      /* 닉네임 프로필 이미지가 바뀌었을 때*/
      console.log("닉네임 프로필 이미지 바뀜:", nickname);
      /* 완료시에 로직 수행*/
      hideModal();
    } else if (isProfileImgChange) {
      /*  프로필 이미지만 바뀜*/
      console.log("프로필 이미지 변경됨");
      /* 완료시에 로직 수행*/
      hideModal();
    } else if (isNicknameValid && isNicknameChange) {
      /*  닉네임만 바뀜*/
      axios
        .put(
          `${API_URL}/api/user/nickname`,
          { nickname: nickname },
          {
            headers: {
              "Content-Type": `application/json`,
              Authorization: "Bearer " + `${userToken}`,
            },
          }
        )
        .then((res) => {
          console.log("닉네임 변경됨");
          setUpdated();
          hideModal();
        })
        .catch((err) => {
          console.log(err);
        });
      /* 완료시에 로직 수행*/
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
            <Pressable
              onPress={() => {
                hideModal();
                resetState();
              }}
            >
              <EvilIcons name="close" size={30} color="black" />
            </Pressable>

            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              프로필 수정
            </Text>

            <TouchableOpacity
              onPress={handleCompletePress}
              disabled={
                (!isNicknameChange || !isNicknameValid) && !isProfileImgChange
              }
            >
              <Text
                style={{
                  fontSize: 19,
                  color:
                    (isNicknameValid && isNicknameChange) || isProfileImgChange
                      ? "black"
                      : "lightgray",
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
                <View style={styles.imageWrapper}>
                  <ImageViewer
                    placeholderImageSource={userInfo.profile_image}
                    selectedImage={imageUrl}
                  />
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
          <View style={{ flex: 2 }}></View>
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
    ...theme.centerStyle,
    position: "relative",
  },
  imageWrapper: {
    borderWidth: 1,
    borderColor: theme.profileBorderColor,
    width: 100,
    height: 100,
    borderRadius: theme.screenWidth / 6,
    ...theme.centerStyle,
    overflow: "hidden",
  },
  iconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "white",
    padding: 5,
    borderRadius: theme.screenWidth / 6,
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
