/** @format */

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Switch,
  Modal,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MediaTypeOptions,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

import { API_URL } from "@env";
import Dropdown from "../../../components/Dropdown";
import ImageViewer from "../../../components/ImageViewer";
import { timeArr, category, post_headers } from "../../../utils/StaticData";
import Button from "../../../utils/StaticData";
import kitchingLogo from "../../../../assets/kitchingLogo.png";
import theme from "../../../styles/theme";
import { REST_API_KEY } from "@env";
import userStore from "../../../store/userStore";

export default function CreateClubPostPage({ route }) {
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [location, setLocation] = useState("");
  const [detailLocation, setDetailLocation] = useState("");
  const [people, setPeople] = useState("");
  const [title, setTitle] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [time, setTime] = useState("");
  const [alarm, setAlarm] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [categoryData, setCategoryData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");
  const [activityImages,setActivityImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [multipleImage,setMultipleImage] = useState([]);
  const [data, setData] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { userToken } = userStore();
  const [status, requestPermission] = useMediaLibraryPermissions();
  const navigation = useNavigation();
  const toggleSwitch = () => setAlarm((alarm) => !alarm);

  const submitPost = () => {
    let missingFields = [];
    if (title === "") missingFields.push("모임명");
    if(title.length > 7) {
      Alert.alert(
        "글쓰기 오류",
        `모임 명은 8글자 미만입니다.`,
        [
          { text: "확인", onPress: () => console.log("확인됨") },
        ],
        { cancelable: false }
      );
      return;
    }
    // if (!validateTitle(title)) {
    //   Alert.alert(
    //     "글쓰기 오류",
    //     `모임 명은 특수문자를 제한합니다.`,
    //     [
    //       { text: "확인", onPress: () => console.log("확인됨") },
    //     ],
    //     { cancelable: false }
    //   );
    // }
    if (categoryData === "") missingFields.push("카테고리");
    if (people === "") missingFields.push("인원");
    if(people < 1){
      Alert.alert(
        "글쓰기 오류",
        `인원이 너무 적습니다.`,
        [
          { text: "확인", onPress: () => console.log("확인됨") },
        ],
        { cancelable: false }
      );
      return;
    }
    const now = new Date(); // 현재 시간을 나타내는 Date 객체 생성
    const startDate = new Date(sDate); // sDate를 Date 객체로 변환
    console.log("sDate : " + sDate); //이게 잘 안나옴 sDate기 인들어갔음

    if(startDate < now){ //잘안됨
      Alert.alert(
        "글쓰기 오류",
        `일시는 현재 시간보다 이후여야 합니다.`,
        [
          { text: "확인", onPress: () => console.log("확인됨") },
        ],
        { cancelable: false }
      );
      return;
    }
    if (location === "") missingFields.push("위치");
    if (year === "") missingFields.push("일시의 연");
    if (month === "") missingFields.push("일시의 달");
    if (day === "") missingFields.push("일시의 일");
    if (hour === "") missingFields.push("일시의 시");
    if (min === "") missingFields.push("일시의 분");

    if (missingFields.length > 0) {
      Alert.alert(
        "글쓰기 오류",
        `${missingFields.join(", ")}를 추가해주세요.`,
        [
          { text: "확인", onPress: () => console.log("확인됨") },
        ],
        { cancelable: false }
      );
    }else{
      setData({
        // alarm: alarm,
        category: categoryData,
        hashtags: hashtags,
        info: {
          title: title,
          max_participants: people,
          description: introduce,
        },
        location: {
          location: location,
          detail_location: detailLocation,
          latitude: latitude,
          longitude: longitude,
        },
        time: {
          start_time: sDate,
          end_time: eDate,
        },
        image: {
          thumbnail_url: imageUrl,
          image_urls: activityImages,
        },
      });
    }
  };

  const validateTitle = (title) => {
    // 정규 표현식을 사용하여 특수문자 제한
    // 이 예시에서는 알파벳, 숫자, 공백, 하이픈, 밑줄, 마침표, 한글만 허용합니다.
    const pattern = /^[A-Za-z0-9 _.-가-힣]+$/;
    return pattern.test(title);
  };

  const getCoordinate = async (placeAddress) => {
    const url =
      "https://dapi.kakao.com/v2/local/search/address.json?query=" +
      encodeURI(placeAddress);
    const axiosResult = await axios({
      url: url,
      method: "get",
      headers: {
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
    }).then((res) => {
      setLatitude(res.data.documents[0].address.y);
      setLongitude(res.data.documents[0].address.x);
    });
  };
  const extractNumberFromString = (str) => {
    const matches = str.match(/^\d+/);
    return matches ? parseInt(matches[0], 10) : null;
  };

  const extractHashTags = (inputText) => {
    const regex = /#[\w가-힣]+/g; // 해시태그 추출을 위한 정규 표현식
    const hashTags = inputText.match(regex) || []; // 해시태그 추출
    return hashTags;
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
      allowsMultipleSelection: true, // 여러 이미지 선택 활성화
    });

    if (!result.canceled) {
      setThumbnailImageUrl(result.assets[0].uri);
      setMultipleImage(result.assets.map(asset => asset.uri));
      console.log("asserts : "+result.assets);
      try {
        for(let i=0; i<result.assets.length; i++){
          // 마지막 '.'의 위치를 찾기
          const lastIndex = result.assets[i].uri.lastIndexOf(".");
          // '.' 이후의 문자열(확장자)를 추출
          const extension = result.assets[i].uri.substring(lastIndex + 1);
          console.log(extension);
          let res = await axios.post(
            `${API_URL}/api/presigned`,
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
          console.log(res.data);
          if(i===0){
            setImageUrl(res.data.image_list[0].image_url);
          }
          else{
            setActivityImages((preActivityImages) => [
              ...preActivityImages,
              res.data.image_list[0].image_url
            ]);
          }
          console.log(res.data.image_list[0].presigned_url);
          console.log(res.data.image_list[0].image_url);

          // 이미지의 URI로부터 바이너리 데이터를 가져옵니다.
          const response = await fetch(result.assets[i].uri);
          const blob = await response.blob();
          const binaryDataArray = await blobToArrayBuffer(blob); //[121, 52, 12, 53]

          if (!res.data.image_list[0].presigned_url) {
            console.error("사전 서명된 URL이 비어 있습니다.");
            return;
          }
          // axios를 사용하여 바이너리 데이터를 서버에 업로드합니다.
          const r = await axios.put(
            res.data.image_list[0].presigned_url,
            binaryDataArray,
            {
              headers: {
                "Content-Type": "image/" + extension, // 혹은 해당 이미지의 MIME 타입에 맞게 설정
              },
            }
          );

          console.log("이미지 업로드 성공");
        }
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생", error);
      }
    } else {
      return null;
    }
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

  useEffect(() => {
    setHashtags(extractHashTags(introduce));
  }, [introduce]);

  useEffect(() => {
    console.log(data);
    axios
      .post(`${API_URL}/api/meetings`, data, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: "Bearer " + `${userToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigation.replace("Home", { isLogin: route.params.isLogin });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  function getDaysArray(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
  
    // 해당 월의 일수 계산
    const numDaysInMonth = lastDay.getDate();
  
    // 해당 월의 모든 일자를 담을 배열 생성
    const daysArray = [];
  
    for (let day = 1; day <= numDaysInMonth; day++) {
      daysArray.push(day);
    }
  
    return daysArray;
  };

  // 위치 등록하는 hook 만약 parmas가 없다면 빈문자
  useEffect(() => {
    if (route.params?.address) {
      setLocation(route.params.address);
    }
  }, [route.params]);

  // 좌표 가져와서 등록하는 hook
  useEffect(() => {
    if (location != "") {
      getCoordinate(location);
    }
  }, [location]);

  useEffect(() => {
    // 의존성 배열의 값 중 하나라도 빈 문자열이면 기능을 수행하지 않습니다.
    if (!year || !month || !day || !hour || !min || !time) {
      return;
    }
  
    // Date 객체를 생성합니다. 월은 0부터 시작하므로 1을 빼줍니다.
    let startDate = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10)+9, parseInt(min, 10));
    console.log(startDate);
    // 종료 시간을 계산하기 위해, 시작 시간에 시간을 더합니다.
    let endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + extractNumberFromString(time));
  
    // ISO 문자열 형식으로 변환합니다.
    setSDate(startDate.toISOString());
    setEDate(endDate.toISOString());
  }, [year, month, day, hour, min, time]);
  

  return (
    <View style={styles.createClubPostPageView}>
      <ScrollView
        style={{ borderTopColor: "#cccccc", borderTopWidth: 1, padding: 16 }}
      >
        <View style={{flexDirection:"row"}}>
          <Text style={styles.createPageLabel}>활동사진</Text>
          <Text style={{fontSize:12,marginLeft:5,color:"#aaaaaa"}}>첫 번째로 선택 된 사진은 썸네일이 됩니다.</Text>
        </View>
        <View style={styles.imageContainer}>
          <Pressable onPress={uploadImage}>
            <View style={{ position: "relative" }}>
              <View style={styles.imageWrapper}>
                {
                  multipleImage.map((image,index)=>{
                    return (
                      <ImageViewer
                        placeholderImageSource={kitchingLogo}
                        selectedImage={image}
                        widthProps="80%"
                        heightProps="80%"
                        key={index}
                      />
                    )
                  })
                }
              </View>
              <View style={styles.iconContainer}>
                <Entypo name="camera" size={17} color="black" />
              </View>
            </View>
          </Pressable>
        </View>
        <Text style={styles.createPageLabel}>카테고리</Text>
        <Dropdown
          dropDownItem={category}
          setData={setCategoryData}
          label="카테고리를 선택해주세요"
        />
        <Text style={styles.createPageLabel}>일시</Text>
        <ScrollView style={{flexDirection:"row", flex: 1 }}>
          <Dropdown dropDownItem={["2023","2024","2025"]} setData={setYear} label="연도" widthProps={(Dimensions.get("window").width)/3} />
          <Dropdown dropDownItem={["01","02","03","04","05","06","07","08","09","10","11","12"]} setData={setMonth} label="월" widthProps={(Dimensions.get("window").width)/3} />
          <Dropdown dropDownItem={getDaysArray(year,month).map(day => day.toString())} setData={setDay} label="일" widthProps={(Dimensions.get("window").width)/3} />
          <Dropdown dropDownItem={Array.from({ length: 24 }, (_, i) => (i).toString())} setData={setHour} label="시" widthProps={(Dimensions.get("window").width)/3} />
          <Dropdown dropDownItem={Array.from({ length: 60 }, (_, i) => (i).toString())} setData={setMin} label="분" widthProps={(Dimensions.get("window").width)/3} />
        </ScrollView>
        <Text style={styles.createPageLabel}>위치</Text>

        <TextInput
          onPressIn={() => {
            navigation.navigate("FindAddress", {
              screen: "FindAddress",
              isLogin: route.params.isLogin,
            });
          }}
          editable={null}
          style={styles.input}
          value={route.params?.address || ""}
          placeholder="예) 거의동 423-2"
        />

        <Text style={styles.createPageLabel}>상세 위치</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDetailLocation}
          value={detailLocation}
          placeholder="예) 디지털관 DB131"
        />
        <Text style={styles.createPageLabel}>인원</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPeople}
          value={people}
          placeholder="모집 인원(본인포함)을 선택해주세요."
        />
        <Text style={styles.createPageLabel}>모임명</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="예) 함께 풋살 하실 분 구해요."
        />
        <Text style={styles.createPageLabel}>모임 소개글</Text>
        <TextInput
          style={styles.inputArea}
          onChangeText={setIntroduce}
          value={introduce}
          rows={3}
          placeholder="예) 함께 풋살 즐기실 분 구해요. 다들 즐기는 분위기여서 실력은 신경쓰지 않으셔도 되고, 재미있게 즐기실 분이면 좋을거같아요"
        />
        <Text style={styles.createPageLabel}>모임 시간</Text>
        <View style={styles.timeBtnView}>
          {timeArr.map((value, index) => {
            return (
              <Button
                // onPress={onPressLearnMore}
                title={value}
                setTime={setTime}
                time={time}
                key={index}
              />
            );
          })}
          <TextInput
            style={styles.inputTime}
            onChangeText={setTime}
            value={time}
            placeholder="직접 입력"
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.createPageLabel}>모임 알림</Text>
            <Text style={styles.createPageSubLabel}>
              모임 시작 알림 메세지를 보냅니다.
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={alarm ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={alarm}
          />
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={submitPost}>
          <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
            게임 등록
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  createClubPostPageView: {
    backgroundColor: "#ffffff",
  },
  createPageLabel: {
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: "#eeeeee",
    padding: 10,
  },
  inputDate: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    marginRight: 5,
    backgroundColor: "#eeeeee",
    padding: 10,
    flex: 1,
  },
  inputArea: {
    height: 80,
    margin: 12,
    backgroundColor: "#eeeeee",
    padding: 10,
  },
  timeBtnView: {
    flexDirection: "row",
    flex: 5,
    marginTop: 8,
    justifyContent: "center",
  },
  timeBtn: {
    flex: 1,
    height: "50px",
  },
  inputTime: {
    height: 40,
    margin: 12,
    backgroundColor: "#eeeeee",
    padding: 10,
    flex: 1,
  },
  createPageSubLabel: {
    fontSize: 12,
    color: "#bbbbbb",
  },
  submitBtn: {
    ...theme.centerStyle,
    backgroundColor: theme.psColor,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
    borderRadius: 15,
    marginBottom: 32,
    marginTop: 32,
  },
  centeredView: {
    flex: 1,
    margin: 12,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#dddddd",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    height: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#eeeeee",
  },
  buttonClose: {
    backgroundColor: theme.psColor,
    borderRadius: 10,
  },
  textStyle: {
    color: "gray",
  },
  textStyleModal: {
    color: "#ffffff",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  imageContainer: {
    flex: 0.5,
    // backgroundColor: "red",
    ...theme.centerStyle,
    position: "relative",
  },
  imageWrapper: {
    borderWidth: 1,
    borderColor: theme.profileBorderColor,
    width: Dimensions.get("window").width - 50,
    height: (Dimensions.get("window").width - 50) / 2,
    borderRadius: theme.screenWidth / 6,
    ...theme.centerStyle,
    overflow: "hidden",
    flexDirection:"row",
    
  },
});
