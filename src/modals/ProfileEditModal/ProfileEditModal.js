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
import userStore from "../../store/userStore";
import modalHandleStore from "../../store/modalHandleStore";
export default function ProfileEditModal() {
  const { userToken, userData, setUpdatedState, updatedState } = userStore();
  const { profileEditModal, setProfileEditModal } = modalHandleStore();
  const [editableNickname, setEditableNickname] = useState(userData.nickname);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [isNicknameChange, setIsNicknameChange] = useState(false);
  const [isProfileImgChange, setIsProfileImgChange] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [presignedUrl, setPresignedUrl] = useState("");
  const [imageExtension, setImageExtension] = useState("");
  const [status, requestPermission] = useMediaLibraryPermissions();

  useEffect(() => {
    if (userData.nickname == editableNickname) {
      setIsNicknameChange(false);
    } else {
      setIsNicknameChange(true);
    }
  }, [editableNickname]);

  useEffect(() => {
    setEditableNickname(userData.nickname);
  }, [userData]);

  useEffect(() => {
    if (selectedImg != "") {
      setIsProfileImgChange(true);
    } else {
      setIsProfileImgChange(false);
    }
  }, [selectedImg]);

  const resetState = () => {
    setEditableNickname(userData.nickname);
    setIsNicknameValid(true);
    setIsNicknameChange(false);
    setIsProfileImgChange(false);
    setSelectedImg("");
  };

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

  const sendUpdatedImg = async () => {
    const r = await axios.put(
      `${process.env.EXPO_PUBLIC_API_URL}/api/user/profile-image`,
      {
        image: {
          profile_image_url: imageUrl,
        },
      },
      {
        headers: {
          "Content-Type": `application/json`,
          Authorization: "Bearer " + `${userToken}`,
        },
      }
    );
    console.log("전송 완료");
  };
  const saveImageToServer = async () => {
    const response = await fetch(selectedImg);
    const blob = await response.blob();
    const binaryDataArray = await blobToArrayBuffer(blob); //[121, 52, 12, 53]
    console.log(presignedUrl, imageExtension);
    const r = await axios.put(presignedUrl, binaryDataArray, {
      headers: {
        "Content-Type": "image/" + imageExtension, // 혹은 해당 이미지의 MIME 타입에 맞게 설정
      },
    });
  };
  const handleNicknameChange = (changeName) => {
    const isValid = validateNickname(changeName);
    setIsNicknameValid(isValid);
    setEditableNickname(changeName);
  };
  const sendUpdatedNickname = async () => {
    try {
      await axios.put(
        `${process.env.EXPO_PUBLIC_API_URL}/api/user/nickname`,
        { nickname: editableNickname },
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + `${userToken}`,
          },
        }
      );
    } catch {
      console.log("에러");
    }
  };
  const validateNickname = (changeName) => {
    const regex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
    return (
      regex.test(changeName) &&
      changeName.length >= 2 &&
      changeName.length <= 10
    );
  };

  const handleCompletePress = () => {
    if (isNicknameValid && isNicknameChange && isProfileImgChange) {
      /* 닉네임 프로필 이미지가 바뀌었을 때*/
      saveImageToServer();
      sendUpdatedImg();
      sendUpdatedNickname();
      console.log("닉네임 프로필 이미지 바뀜:", editableNickname);
    } else if (isProfileImgChange) {
      /*  프로필 이미지만 바뀜*/
      saveImageToServer();
      sendUpdatedImg();
      console.log("프로필 이미지 변경됨");
    } else if (isNicknameValid && isNicknameChange) {
      /*  닉네임만 바뀜*/
      sendUpdatedNickname();
      console.log("닉네임 변경됨");
    }
    setUpdatedState(!updatedState);
    setProfileEditModal(false);
  };

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

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
      aspect: [3, 1],
    });

    if (!result.canceled) {
      setSelectedImg(result.assets[0].uri);
      try {
        // 마지막 '.'의 위치를 찾기
        const lastIndex = result.assets[0].uri.lastIndexOf(".");
        // '.' 이후의 문자열(확장자)를 추출
        const extension = result.assets[0].uri.substring(lastIndex + 1);
        setImageExtension(extension);

        let res = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/api/presigned`,
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
        setImageUrl(res.data.image_list[0].image_url);
        setPresignedUrl(res.data.image_list[0].presigned_url);
        // console.log(res.data.image_list[0].presigned_url);
        // console.log(res.data.image_list[0].image_url);
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생", error);
      }
    } else {
      return null;
    }
  };

  return (
    <Modal
      visible={profileEditModal}
      contentContainerStyle={styles.modalContainer}
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={{ flex: 0.14 }} />
        <View style={styles.modalHeaderContainer}>
          <View style={styles.modalHeader}>
            <Pressable
              onPress={() => {
                setProfileEditModal(false);
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
                    placeholderImageSource={userData.profile_image}
                    selectedImage={selectedImg}
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
              value={editableNickname}
              onChangeText={handleNicknameChange}
              maxLength={10}
            />
            {!isNicknameValid && (
              <Text style={{ color: "red", marginTop: 5 }}>
                닉네임은 공백과 특수문자를 제외한 2~10자로 입력해주세요
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
