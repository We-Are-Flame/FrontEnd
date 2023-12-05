import React,{useEffect,useState} from "react";
import { View, Text,Button,StyleSheet,TextInput } from "react-native";

import { Image } from 'expo-image';

import axios from 'axios';
import { API_URL } from '@env';

import userStore from '../../../../store/userStore';
import theme from '../../../../styles/theme';

export default function ChatUserItem({ users }) {
  const {userData} = userStore();

  return (
    <View style={styles.chatUserItemView}>
      <Image
          source={users.profile_image}
          style={{
            width: 50,
            height: 50,
            marginTop: 3,
            marginRight: 5,
            borderRadius:30,
          }} // 예시 크기, 원하는 대로 조절
          resizeMode="cover" // 또는 "contain", "stretch" 등
        />
        {
          (userData.nickname === users.nickname) ? 
          <View style={{flexDirection:"row", ...theme.centerStyle}}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>나</Text>
            </View>
            <Text>{users.nickname}</Text>
          </View> :
          <View style={{flexDirection:"row", ...theme.centerStyle}}>
            <Text>{users.nickname}</Text>
          </View>
        }
        
    </View>
  );
}

const styles = StyleSheet.create({
  chatUserItemView:{
    flexDirection:"row",
    marginTop:20
  },
  circle: {
    backgroundColor: theme.psColor,
    borderRadius: 11, // 반지름 설정, 너비와 높이의 절반
    width: 22, // 동그라미의 너비
    height: 22, // 동그라미의 높이
    alignItems: 'center', // 가로 정렬
    justifyContent: 'center', // 세로 정렬
    marginRight: 5
  },
  circleText: {
    color: "#ffffff",
    textAlign: "center", // 가로 방향 중앙 정렬
    lineHeight: 22 // 세로 방향 중앙 정렬
  },
});
