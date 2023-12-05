/** @format */

import React,{useState,useEffect} from "react";
import { View, Text,Dimensions } from "react-native";

import Header from './../../components/Header';

import theme from '../../styles/theme';
import MyCarousel from './../../components/MyCarousel';

import axios from 'axios';
import userStore from '../../store/userStore';
import { API_URL } from '@env';

export default function RandomScreen({ navigation }) {
  const [data,setData] = useState([]);
  const {userToken} = userStore();
  const ment = [
    "오늘은 이 모임 어떠세요?",
    "찾았다 !",
    "오늘은 여기가 좋겠다 !",
    "나의 불꽃은 여기서?",
    "위대함에 동참하라.",
  ];

  function getRandomMent() {
    const randomIndex = Math.floor(Math.random() * ment.length);
    return ment[randomIndex];
  }

  useEffect(()=>{
    axios.get(`${API_URL}/api/meetings?start=0&end=10&sort=soon`,{
      headers: {
        "Content-Type": `application/json`,
        Authorization: "Bearer " + `${userToken}`,
      },
    })
    .then((res)=>{
      setData(res.data.content);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
      ></View>

      <Header />
      <View style={{flex:7}}>
        <View style={{...theme.centerStyle, flex:1}}>
          <Text style={{fontSize:24,fontWeight:"bold"}}>{getRandomMent()}</Text>
        </View>
        <MyCarousel entries={data} widthProps={Dimensions.get('window').width} heightProps={400} layout="tinder" flag={2}/>
      </View>
    </View>
  );
}
