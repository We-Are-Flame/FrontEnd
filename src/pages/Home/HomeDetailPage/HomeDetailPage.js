/** @format */

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Linking from "expo-linking";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import kitchingLogo from "../../../../assets/kitchingLogo.png";
import SchoolAuthMark from "../../../components/SchoolAuthMark";
import Spinner from "../../../../assets/loading_spinner.svg";
import theme from "../../../styles/theme";
import HomeDetailComment from "./HomeDetailComment/HomeDetailComment";
import HomeDetailCommentInput from "./HomeDetailComment/HomeDetailCommentInput";
import MyCarousel from "../../../components/MyCarousel";
import placeHolderIMG from "../../../../assets/kitchingLogo.png";
import GoogleMap from "../../../components/GoogleMap";
import { API_URL } from "@env";
import userStore from "../../../store/userStore";
import modalHandleStore from "../../../store/modalHandleStore";
import Loading from "../../../components/Loading";

export default function HomeDetailPage({ route }) {
  const [detailData, setDetailData] = useState({});
  const [hashtagString, setHashtagString] = useState("");
  const [dateStirng, setDateString] = useState("");
  const [timeRangeString, setTimeRangeString] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [addedComment, setAddedComment] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [carouselImage, setCarouselImage] = useState([]);
  const [pageLoading, setPageLoading] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const { userToken, isLogin } = userStore();
  const { setLoginModal } = modalHandleStore();
  const carouselArr = [kitchingLogo, kitchingLogo, kitchingLogo];

  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const stateId = route.params.id;

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const isPM = hours >= 12;
    const formattedHour = isPM ? hours - 12 : hours;
    const amPmString = isPM ? "오후" : "오전";

    // 분이 한 자리 수일 경우 앞에 0을 붙임
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${amPmString} ${formattedHour}:${formattedMinutes}`;
  };
  const fetchData = async () => {
    try {
      setPageLoading(true);
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/${stateId}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + `${userToken}`,
          },
        }
      );
      setDetailData(res.data);
      setPageLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [stateId, isUpdate]);

  useEffect(() => {
    if (Object.keys(detailData).length !== 0) {
      // 해시태그에 '#'이 붙어있지 않으면 붙이기
      const formattedHashtags = detailData.hashtags.map((tag) =>
        tag.startsWith("#") ? tag : `#${tag}`
      );

      // 모든 해시태그를 공백으로 구분하여 하나의 문자열로 결합
      setHashtagString(formattedHashtags.join(" "));

      setImageSource(
        detailData.host.profile_image
          ? { uri: detailData.host.profile_image }
          : null
      );
    }
  }, [detailData.hashtags]);

  useEffect(() => {
    if (
      detailData.time &&
      detailData.time.start_time &&
      startTime instanceof Date
    ) {
      const year = startTime.getFullYear(); // 년
      const month = startTime.getMonth() + 1; // 월
      const date = startTime.getDate(); // 일
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      const dayOfWeek = days[startTime.getDay()]; // 요일

      setDateString(`${year}년 ${month}월 ${date}일 (${dayOfWeek})`);
    }
  }, [startTime, detailData]);

  useEffect(() => {
    const formatTimeRange = async () => {
      if (startTime && endTime && Object.keys(detailData).length !== 0) {
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);
        setTimeRangeString(`${formattedStartTime} ~ ${formattedEndTime}`);
      }
    };

    formatTimeRange();
  }, [startTime, endTime, detailData]);

  useEffect(() => {
    // console.log(detailData);
    if (detailData.time && detailData.time.start_time) {
      setStartTime(new Date(detailData.time.start_time));
      setEndTime(new Date(detailData.time.end_time));
      setCarouselImage([
        detailData.image.thumbnail_url,
        ...detailData.image.image_urls,
      ]);
    }
  }, [detailData]);

  const addComment = (newComment) => {
    setAddedComment((prevComments) => [...prevComments, newComment]);
  };

  const clickModify = () => {
    console.log("수정");
    setModalVisible(false);
  };

  const clickDelete = () => {
    axios
      .delete(
        `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/${detailData.id}`,
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + `${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setModalVisible(false);
        navigation.replace("Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickApply = () => {
    Alert.alert(
      "신청하시겠습니까?",
      `${detailData.info.title} 모임에 가입합니다.`,
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
            const res = await axios.post(
              `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/${detailData.id}/apply`,
              null,
              {
                headers: {
                  "Content-Type": `application/json`,
                  Authorization: "Bearer " + `${userToken}`,
                },
              }
            );
            setIsUpdate(!isUpdate);
            //채팅방 입장 통신 추가할 것
          },
        },
      ]
    );
  };

  const clickCancel = () => {
    Alert.alert(
      "모임을 신청을 취소 하시겠습니까?",
      `신청 관리 명단에서 제외됩니다.`,
      [
        {
          text: "취소",
          onPress: () => {
            console.log("취소");
          },
        },
        {
          text: "확인",
          onPress: () => {
            axios
              .post(
                `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/${detailData.id}/cancel`,
                null,
                {
                  headers: {
                    "Content-Type": `application/json`,
                    Authorization: "Bearer " + `${userToken}`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
                setIsUpdate(!isUpdate);
                //채팅방 퇴장 통신 추가할 것
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
      ]
    );
  };

  return Object.keys(detailData).length !== 0 ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios"
          ? theme.screenHeight / 15
          : theme.screenHeight / 10
      }
    >
      {pageLoading ? (
        <Loading />
      ) : (
        <View style={styles.homeDetailPageView}>
          <View style={styles.homeDetailContentView}>
            <ScrollView style={styles.homeDetailScrollView} ref={scrollViewRef}>
              <View style={styles.homeDetailTitle}>
                <View style={{ flexDirection: "row" }}>
                  {imageSource ? (
                    <Image
                      source={imageSource}
                      style={{
                        borderRadius: 50,
                        width: 24,
                        height: 24,
                        marginTop: 3,
                        marginRight: 5,
                      }} // 예시 크기, 원하는 대로 조절
                      contentFit="cover" // 또는 "contain", "stretch" 등
                    />
                  ) : (
                    <Ionicons name="person" size={24} color="black" />
                  )}
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        {detailData.info.title}&nbsp;&nbsp;&nbsp;
                      </Text>
                      <Text
                        style={{
                          color: "#aaaaaa",
                          fontWeight: "bold",
                          fontSize: 10,
                        }}
                      >
                        {detailData.category || "스포츠"}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ fontWeight: "bold", flexGrow: 0 }}>
                        {detailData.host.name}
                      </Text>
                      {detailData.host.is_school_email ? (
                        <SchoolAuthMark width={25} height={25} />
                      ) : null}
                    </View>
                  </View>
                </View>
                <View></View>
                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  {detailData.status.is_owner ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ClubManagePage", {
                          clubId: detailData.id,
                        })
                      }
                    >
                      <Text style={styles.homeDetailAppManageBtn}>
                        신청관리
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    ""
                  )}
                </View>
                <View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <TouchableWithoutFeedback
                      onPress={() => setModalVisible(false)}
                    >
                      <View style={styles.modalOverlay}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <Pressable
                              style={({ pressed }) => [
                                {
                                  opacity: pressed ? 0.2 : 1,
                                },
                              ]}
                              onPress={clickDelete}
                            >
                              <Text
                                style={[
                                  styles.modalText,
                                  styles.modalTextDelete,
                                ]}
                              >
                                삭제
                              </Text>
                            </Pressable>
                            <Pressable
                              style={({ pressed }) => [
                                {
                                  opacity: pressed ? 0.2 : 1,
                                },
                              ]}
                              onPress={() => setModalVisible(false)}
                            >
                              <Text
                                style={[
                                  styles.modalText,
                                  styles.modalTextClose,
                                ]}
                              >
                                닫기
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </Modal>
                  {detailData.status.is_owner ? (
                    <Pressable onPress={() => setModalVisible(true)}>
                      <AntDesign name="ellipsis1" size={30} color="black" />
                    </Pressable>
                  ) : null}
                </View>
              </View>

              <View style={styles.homeDetailContent}>
                <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                  {detailData.info.title}
                </Text>
                <Text style={{ marginTop: 10 }}>
                  {detailData.info.description}
                </Text>
                <Text style={{ color: theme.psColor }}>{hashtagString}</Text>

                <MyCarousel
                  entries={
                    carouselImage.length !== 0 ? carouselImage : carouselArr
                  }
                  widthProps={Dimensions.get("window").width}
                  heightProps={200}
                  layout="default"
                  flag={1}
                />

                {/* 여기에 종료된게임, 참가신청, 참가취소 버튼 추가 */}
                {detailData.status.is_expire ? (
                  <TouchableOpacity style={styles.homeDetailStateBtnGray}>
                    <Text style={styles.homeDetailStateTextGray}>
                      종료된 게임
                    </Text>
                  </TouchableOpacity>
                ) : detailData.status.is_owner ? (
                  ""
                ) : detailData.status.participate_status === "NONE" ? (
                  <TouchableOpacity
                    style={styles.homeDetailStateBtnBlue}
                    onPress={() => {
                      if (isLogin) {
                        clickApply();
                      } else {
                        setLoginModal(true);
                      }
                    }}
                  >
                    <Text style={styles.homeDetailStateTextBlue}>
                      참가 신청
                    </Text>
                  </TouchableOpacity>
                ) : detailData.status.participate_status === "ACCEPTED" ? (
                  <TouchableOpacity style={styles.homeDetailStateBtnBlack}>
                    <Text>수락됨</Text>
                  </TouchableOpacity>
                ) : detailData.status.participate_status === "PENDING" ? (
                  <TouchableOpacity style={styles.homeDetailStateBtnBlue}>
                    <Text style={styles.homeDetailStateTextBlue}>
                      수락 대기중
                    </Text>
                  </TouchableOpacity>
                ) : detailData.status.participate_status === "REJECTED" ? (
                  <TouchableOpacity style={styles.homeDetailStateBtnRed}>
                    <Text style={styles.homeDetailStateTextRed}>
                      수락 거절됨
                    </Text>
                  </TouchableOpacity>
                ) : (
                  ""
                )}
              </View>

              <View style={styles.homeDetailSpace} />

              <View style={styles.homeDetailInformation}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row", flex: 4 }}>
                    <AntDesign name="calendar" size={24} color="black" />
                    <Text style={styles.informationFormmat}>날짜</Text>
                  </View>
                  <Text style={{ ...styles.informationFormmat, flex: 6 }}>
                    {dateStirng}
                  </Text>
                </View>
              </View>

              <View style={styles.homeDetailInformation}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row", flex: 4 }}>
                    <AntDesign name="clockcircle" size={24} color="black" />
                    <Text style={styles.informationFormmat}>시간</Text>
                  </View>
                  <Text style={{ ...styles.informationFormmat, flex: 6 }}>
                    {timeRangeString}
                  </Text>
                  <Text></Text>
                </View>
              </View>

              <View style={styles.homeDetailInformation}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row", flex: 4 }}>
                    <Ionicons name="people" size={24} color="black" />
                    <Text style={styles.informationFormmat}>모집인원</Text>
                  </View>
                  <Text style={{ ...styles.informationFormmat, flex: 6 }}>
                    {detailData.info.current_participants} /{" "}
                    {detailData.info.max_participants}
                  </Text>
                  <Text></Text>
                </View>
              </View>

              <View style={styles.homeDetailInformation}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row", flex: 4 }}>
                    <MaterialIcons name="place" size={24} color="black" />
                    <Text style={styles.informationFormmat}>위치</Text>
                  </View>
                  <Text
                    style={{
                      ...styles.informationFormmat,
                      flex: 6,
                    }}
                  >
                    {`${detailData.location.location} ${detailData.location.detail_location}`}
                  </Text>
                  <Text></Text>
                </View>
              </View>

              <View style={styles.homeDetailMap}>
                <GoogleMap
                  mylatitude={detailData.location.latitude}
                  detailLocation={detailData.location.detail_location}
                  mylongitude={detailData.location.longitude}
                />
              </View>

              <View
                style={{
                  backgroundColor: "white",
                  padding: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    ...theme.centerStyle,
                    backgroundColor: "#f5f5f5",
                    height: 60,
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      flex: 8,
                      color: theme.psColor,
                      fontWeight: "bold",
                    }}
                  >
                    {detailData.location.location}
                  </Text>
                  <View
                    style={{
                      flex: 2,
                      height: 35,
                      borderRadius: 20,
                      backgroundColor: "#ffffff",
                      ...theme.centerStyle,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        Linking.openURL(
                          `http://maps.google.com/?q=${detailData.location.location}`
                        );
                      }}
                    >
                      <Text
                        style={{
                          color: theme.psColor,
                        }}
                      >
                        길찾기
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>

              <View style={styles.homeDetailSpace} />

              <HomeDetailComment addedComment={addedComment} id={stateId} />
            </ScrollView>
          </View>
          <HomeDetailCommentInput
            id={stateId}
            scrollViewRef={scrollViewRef}
            setAddedComment={addComment}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  ) : (
    <Image
      source={Spinner}
      contentFit="cover" // 또는 fill
    />
  );
}

const styles = StyleSheet.create({
  homeDetailPageView: {
    flex: 1,
  },
  homeDetailHeaderView: {
    flex: 1,
  },
  homeDetailContentView: {
    flex: 8,
  },
  homeDetailTitle: {
    padding: 10,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  homeDetailAppManageBtn: {
    backgroundColor: theme.psColor,
    color: "#ffffff",
    padding: 5,
    borderRadius: 20,
    width: 80,
    fontWeight: "bold",
    textAlign: "center",
  },
  homeDetailContent: {
    backgroundColor: "#ffffff",
    padding: 10,
    // borderBottomWidth: 1, // 하단 테두리의 두께
    // borderBottomColor: "#cccccc", // 하단 테두리의 색상
  },
  homeDetailInformation: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderBottomWidth: 1, // 하단 테두리의 두께
    borderBottomColor: "#cccccc", // 하단 테두리의 색상
  },
  informationFormmat: {
    fontWeight: "bold",
    marginTop: 3,
    marginLeft: 5,
  },
  homeDetailMap: {
    ...theme.centerStyle,
    backgroundColor: "#ffffff",
    padding: 10,
    height: 200,
  },
  homeDetailStateBtnGray: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    ...theme.centerStyle,
  },
  homeDetailStateTextGray: {
    color: "#cccccc",
  },

  homeDetailStateBtn: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    ...theme.centerStyle,
  },
  homeDetailStateBtnBlue: {
    ...theme.detailStateBtnStyle,
    borderColor: theme.psColor,
  },
  homeDetailStateTextBlue: {
    color: theme.psColor,
  },
  homeDetailStateBtnRed: {
    ...theme.detailStateBtnStyle,
    borderColor: "#ff0000",
  },
  homeDetailStateBtnBlack: {
    ...theme.detailStateBtnStyle,
    borderColor: "#000000",
  },

  homeDetailStateBtnDisabled: {
    ...theme.detailStateBtnStyle,
    borderColor: "lightgray",
  },
  homeDetailStateTextRed: {
    color: "#ff0000",
  },
  homeDetailSpace: {
    backgroundColor: "#f5f5f5",
    height: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
  },
  modalText: {
    fontSize: 25,
    paddingRight: 80,
    paddingLeft: 80,
    marginTop: 10,
  },
  modalTextModify: {
    color: theme.psColor,
  },
  modalTextDelete: {
    color: "red",
  },
});
