/** @format */

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Modal,
  TouchableOpacity,
  Alert,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { FAB, PaperProvider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../styles/theme";
import Header from "../../components/Header";
import HomeContent from "./HomeContent/HomeContent";
import HomeCategory from "./HomeCategory/HomeCategory";
import Dropdown from "../../components/Dropdown";
import { sort_kor, sort } from "../../utils/StaticData";
import userStore from "../../store/userStore";
import { API_URL } from "@env";
import modalHandleStore from "../../store/modalHandleStore";
import ReviewModalItem from "./ReviewModalItem/ReviewModalItem";
import Loading from "../../components/Loading";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [clubList, setClubList] = useState({});
  const [selectedSort, setSelectedSort] = useState(sort_kor[0]);
  const [pageLoading, setPageLoading] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [endClub, setEndClub] = useState(true);
  const { setLoginModal } = modalHandleStore();
  const { userToken, updatedState, isLogin } = userStore();
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setPage(1);
      fetchData();
    }, 1000);
  }, []);

  const fetchData = async () => {
    setPageLoading(true);
    const clubData = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/meetings?index=0&size=10&sort=${sort[selectedSort]}`,
      {
        headers: {
          "Content-Type": `application/json`,
          Authorization: "Bearer " + `${userToken}`,
        },
      }
    );
    setClubList(clubData.data);
    setPageLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedSort, updatedState]);

  const getData = async () => {
    const result = await axios.get(
      selectedCategory === ""
        ? `${process.env.EXPO_PUBLIC_API_URL}/api/meetings?index=${page}&size=10&sort=${sort[selectedSort]}`
        : `${process.env.EXPO_PUBLIC_API_URL}/api/meetings?index=${page}&size=10&sort=${sort[selectedSort]}&category=${selectedCategory}`
    );
    if (result.data.total_elements === clubList.content.length) {
      setLoading(false);
      return;
    }

    setClubList((prevList) => {
      return {
        ...prevList,
        content: [...prevList.content, ...result.data.content],
      };
    });

    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    console.log(page);
  }, [page]);
  const onEndReached = () => {
    if (!loading) {
      getData();
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/meetings?index=0&size=10&sort=${sort[selectedSort]}&category=${selectedCategory}`
      )
      .then((res) => {
        if (res.data && Array.isArray(res.data.content)) {
          setClubList(res.data); // Ensure data is structured correctly
        } else {
          // Handle unexpected response
        }
      })
      .catch((err) => {
        console.log(err);
        // Handle error
      });
  }, [selectedCategory]);

  return (
    <PaperProvider>
      <View style={styles.homeScreenView}>
        <View
          style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
        ></View>

        <Header />

        <View style={{ flex: 7 }}>
          {pageLoading ? (
            <Loading />
          ) : (
            <FlatList
              onEndReached={onEndReached}
              onEndReachedThreshold={0.6}
              disableVirtualization={false}
              ListFooterComponent={loading && <ActivityIndicator />}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={{ flex: 7 }}
              data={[{ key: "category" }, { key: "sort" }, { key: "content" }]} // Dummy data for rendering different sections
              renderItem={({ item }) => (
                <View>
                  {item.key === "category" && (
                    <View style={styles.homeScreenCategory}>
                      <Text style={styles.homeScreenCategoryText}>
                        카테고리 별로
                      </Text>
                      <Text style={styles.homeScreenCategoryText}>
                        확인해 보세요!
                      </Text>
                      <HomeCategory setSelectedCategory={setSelectedCategory} />
                    </View>
                  )}
                  {item.key === "sort" && (
                    <View style={styles.homeScreenSort}>
                      <Dropdown
                        dropDownItem={sort_kor}
                        setData={setSelectedSort}
                        label="정렬 선택"
                        widthProps={150}
                      />
                    </View>
                  )}
                  {item.key === "content" &&
                    (clubList.number_of_elements !== 0 ? (
                      <View style={styles.homeScreenContent}>
                        <HomeContent clubList={clubList} />
                      </View>
                    ) : (
                      <View
                        style={{
                          ...theme.centerStyle,
                          flex: 1,
                          marginTop: theme.screenHeight / 5,
                        }}
                      >
                        <Text style={{ fontSize: 16, color: "gray" }}>
                          {`아직 모임이 없어요. 새로운 모임을 만들어보세요!`}
                        </Text>
                      </View>
                    ))}
                </View>
              )}
            />
          )}
        </View>
        <FAB
          style={styles.fab}
          icon="plus"
          color="#ffffff"
          onPress={() => setModalVisible(!modalVisible)} // 'Pressed' 대신에 모달을 열도록 변경
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(!modalVisible)} // 이 부분이 모달 외부를 눌렀을 때 닫히도록 함
          >
            <Text style={styles.modalText}>모임 만들기</Text>

            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  if (isLogin) {
                    navigation.navigate("CreateClubPostPage");
                    setModalVisible(false);
                  } else {
                    setModalVisible(false);
                    setLoginModal(true);
                  }
                }}
                hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
              >
                <Ionicons name="baseball-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  homeScreenView: {
    flex: 1,
  },
  homeScreenHeader: {
    flex: 0.8,
    backgroundColor: theme.psColor,
  },
  homeScreenCategory: {
    margin: 30,
    marginBottom: 0,
  },
  homeScreenCategoryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    // backgroundColor: "#61D451",
    backgroundColor: theme.psColor,
    borderRadius: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalText: {
    position: "absolute",
    margin: 16,
    right: 70,
    bottom: 200,
    width: "20px",
    height: "20px",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalView: {
    position: "absolute",
    ...theme.centerStyle,
    margin: 16,
    right: 0,
    bottom: 180,
    // width: "20px",
    // height: "20px",
    width: 56,
    height: 56,

    // 모달의 높이, 배경색 등 원하는 스타일을 추가하세요
    backgroundColor: "white",

    // 모달의 둥근 모서리를 위한 스타일
    borderRadius: 30,
    // 그림자를 위한 스타일
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    // 닫기 버튼 스타일
  },
  textStyle: {
    color: "black",
    // 텍스트 스타일
  },
  homeScreenSort: {
    alignItems: "flex-end",
  },
  reviewModal: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  reviewSubmitBtn: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    padding: 10,
    borderRadius: 10,
  },
  reviewCancelBtn: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#cccccc",
    padding: 10,
    borderRadius: 10,
  },
});
