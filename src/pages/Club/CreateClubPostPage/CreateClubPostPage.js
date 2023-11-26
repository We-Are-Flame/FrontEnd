/** @format */

import { StyleSheet, Text, View, ScrollView,TextInput,Switch,Modal,Pressable,Dimensions } from "react-native";
import { useState } from "react";
import {
  MediaTypeOptions,
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from "expo-image-picker";

import { timeArr } from '../../../utils/StaticData';
import Button from '../../../utils/StaticData';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import theme from '../../../styles/theme';

import { category } from '../../../utils/StaticData';
import lion from "../../../../assets/lion.webp";
import { Entypo } from "@expo/vector-icons";

import Dropdown from '../../../components/Dropdown';
import GooglePlacesInput from '../../../components/GooglePlacesInput';
import ImageViewer from '../../../components/ImageViewer';


export default function CreateClubPostPage() {
  const [sDate,setSDate] = useState("");
  const [eDate,setEDate] = useState("");
  const [year,setYear] = useState("");
  const [month,setMonth] = useState("");
  const [day,setDay] = useState("");
  const [hour,setHour] = useState("");
  const [min,setMin] = useState("");
  const [location,setLocation] = useState("");
  const [detailLocation,setDetailLocation] = useState("");
  const [people,setPeople] = useState("");
  const [title,setTitle] = useState("");
  const [introduce,setIntroduce] = useState("");
  const [time,setTime] = useState("");
  const [alarm,setAlarm] = useState(false);
  const [hashtags,setHashtags] = useState([]);
  const [categoryData,setCategoryData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");
  const [data,setData] = useState({});

  const [status, requestPermission] = useMediaLibraryPermissions();

  const toggleSwitch = () => setAlarm(alarm => !alarm);
  
  const submitPost = ()=>{
    setData({
      alarm:alarm,
      category:categoryData,
      hashtags:hashtags,
      info:{
        name:title,
        max_participants:people,
        description:introduce,
      },
      location:{
        location:location,
        detail_location:detailLocation
      },
      time:{
        start_time:sDate,
        end_time:eDate
      },
      image:{
        thumbnail_url:thumbnailImageUrl,
        image_urls:[
          "image.jpg",
          "image.jpg",
        ]
      }
    });
  };

  const extractNumberFromString = (str) => {
    const matches = str.match(/\d+/);
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

    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [3, 1],
    });

    if (!result.canceled) {
      setThumbnailImageUrl(result.assets[0].uri);
    } else {
      return null;
    }
  };

  useEffect(()=>{
    setHashtags(extractHashTags(introduce));
  },[introduce]);

  useEffect(()=>{
    console.log(data);
    //여기서 통신 조건문으로 데이터 하나라도 없으면 안되도록 처리
  },[data]);

  useEffect(()=>{
    let calHour = parseInt(hour)+extractNumberFromString(time);
    setSDate(`${year}-${month}-${day}T${hour}:${min}:00Z`);
    setEDate(`${year}-${month}-${day}T${calHour}:${min}:00Z`);
  },[year,month,day,hour,min,time]);

  return (
    <View style={styles.createClubPostPageView}>
      <ScrollView style={{borderTopColor:"#cccccc" , borderTopWidth: 1, padding:16}}>
      <Text style={styles.createPageLabel}>썸네일</Text>
        <View style={styles.imageContainer}>
          <Pressable onPress={uploadImage}>
            <View style={{ position: "relative" }}>
              <View style={styles.imageWrapper}>
                <ImageViewer
                  placeholderImageSource={lion}
                  selectedImage={thumbnailImageUrl}
                  widthProps="100%"
                  heightProps="100%"
                />
              </View>
              <View style={styles.iconContainer}>
                <Entypo name="camera" size={17} color="black" />
              </View>
              </View>
          </Pressable>
        </View>
        <Text style={styles.createPageLabel}>카테고리</Text>
        <Dropdown dropDownItem={category} setData={setCategoryData} label="카테고리를 선택해주세요"/>
        <Text style={styles.createPageLabel}>일시</Text>
        <View style={{flexDirection:"row", flex:1}}>
          <TextInput
            style={styles.inputDate}
            onChangeText={setYear}
            value={year}
            placeholder="YYYY"
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.inputDate}
            onChangeText={setMonth}
            value={month}
            placeholder="MM"
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.inputDate}
            onChangeText={setDay}
            value={day}
            placeholder="DD"
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.inputDate}
            onChangeText={setHour}
            value={hour}
            placeholder="HH"
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.inputDate}
            onChangeText={setMin}
            value={min}
            placeholder="mm"
            keyboardType="number-pad"
          />
        </View>
        <Text style={styles.createPageLabel}>위치</Text>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <GooglePlacesInput setState={setLocation} />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyleModal}>주소 입력 완료</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            {
              (location.length === 0) ? 
              <Text style={styles.textStyle}>위치 검색하기</Text> :
              <Text style={styles.textStyle}>{location}</Text>
            }
          </Pressable>
        </View>
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
          {
            timeArr.map((value,index)=>{
              return <Button
              // onPress={onPressLearnMore}
              title={value}
              setTime={setTime}
              time={time}
              key={index}
            />
            })
          }
          <TextInput
          style={styles.inputTime}
          onChangeText={setTime}
          value={time}
          placeholder="직접 입력"
        />
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <View>
            <Text style={styles.createPageLabel}>모임 알림</Text>
            <Text style={styles.createPageSubLabel}>모임 시작 알림 메세지를 보냅니다.</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={alarm ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={alarm}
          />
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={submitPost}>
          <Text style={{color:"#ffffff", fontWeight:"bold"}}>게임 등록</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  createClubPostPageView:{
    backgroundColor:"#ffffff",
  },
  createPageLabel:{
    fontWeight:"bold",
    fontSize:20,
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor:"#eeeeee",
    padding: 10,
  },
  inputDate:{
    height: 40,
    marginTop: 12,
    marginBottom:12,
    marginRight:5,
    backgroundColor:"#eeeeee",
    padding: 10,
    flex:1,
  },
  inputArea:{
    height: 80,
    margin: 12,
    backgroundColor:"#eeeeee",
    padding: 10,
  },
  timeBtnView:{
    flexDirection:"row",
    flex:5,
    marginTop:8,
    justifyContent:"center"
  },
  timeBtn:{
    flex:1,
    height:"50px"
  },
  inputTime:{
    height: 40,
    margin: 12,
    backgroundColor:"#eeeeee",
    padding: 10,
    flex:1,
  },
  createPageSubLabel:{
    fontSize:12,
    color:"#bbbbbb",
  },
  submitBtn:{
    ...theme.centerStyle,
    backgroundColor:theme.psColor,
    width:"90%",
    marginLeft:"auto",
    marginRight:"auto",
    padding:20,
    borderRadius:15,
    marginBottom:32,
    marginTop:32
  },
  centeredView: {
    flex: 1,
    margin: 12,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#dddddd',
    borderRadius: 20,
    padding: 35,
    width:"90%",
    height:"100%",
    shadowColor: '#000',
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
    backgroundColor: '#eeeeee',
  },
  buttonClose: {
    backgroundColor: theme.psColor,
    borderRadius:10,
  },
  textStyle: {
    color: 'gray',
  },
  textStyleModal:{
    color:"#ffffff",
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
    width: Dimensions.get('window').width - 50,
    height: (Dimensions.get('window').width - 50)/2,
    borderRadius: theme.screenWidth / 6,
    ...theme.centerStyle,
    overflow: "hidden",
  },
});
