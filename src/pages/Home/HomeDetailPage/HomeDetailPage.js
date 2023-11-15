/** @format */

import * as React from "react";
import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native';
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

import HomeDetailHeader from './HomeDetailHeader/HomeDetailHeader';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import theme from '../../../styles/theme';


export default function HomeDetailPage({route}) {
  const navigation = useNavigation();
  const state = route.params.detailData;
  
  return (
    <View style={styles.homeDetailPageView}>
      <View style={styles.homeDetailHeaderView}>
        <HomeDetailHeader name={state.nickname}/>
      </View>
      <View style={styles.homeDetailContentView}>
        <ScrollView style={styles.homeDetailScrollView}>
          <View style={styles.homeDetailTitle}>
            <View style={{flexDirection:"row"}}>
              <Ionicons name="person" size={30} color="black" />
              <View>
                <View style={{flexDirection:"row"}}>
                  <Text style={{fontWeight:"bold", fontSize:10}}>{state.title}&nbsp;&nbsp;&nbsp;</Text>
                  <Text style={{color:"#aaaaaa", fontWeight:"bold", fontSize:10}}>{state.category}</Text>
                </View>
                <Text style={{fontWeight:"bold"}}>{state.nickname}</Text>
              </View>
            </View>
            <View>

            </View>
            <View>
            {
                (state.myBoard) ? 
                <TouchableOpacity onPress={() => navigation.navigate("ClubManagePage")}>
                  <Text style={styles.homeDetailAppManageBtn}>
                    신청관리
                  </Text>
                </TouchableOpacity>
                :
                ""
            }
            </View>
            <View>
              <AntDesign name="ellipsis1" size={30} color="black" />
            </View>
          </View>

          <View style={styles.homeDetailContent}>
            <Text style={{fontWeight:"bold", fontSize:22}}>
              {state.title}
            </Text>
            <Text style={{marginTop:10}}>
              {state.content}
            </Text>
            <Text style={{color:theme.psColor}}>
              {state.hashtag}
            </Text>
            
            {/* 여기에 종료된게임, 참가신청, 참가취소 버튼 추가 */}
          </View>

          <View style={styles.homeDetailInformation}>
            <View style={{flexDirection:"row"}}>
              <View style={{flexDirection:"row", flex:4}}>
                <AntDesign name="calendar" size={24} color="black" />
                <Text style={styles.informationFormmat}>날짜</Text>
              </View>
              <Text style={{...styles.informationFormmat, flex:6}}>
                {state.date}
              </Text>
            </View>
          </View>

          <View style={styles.homeDetailInformation}>
            <View style={{flexDirection:"row"}}>
              <View style={{flexDirection:"row", flex:4}}>
              <AntDesign name="clockcircle" size={24} color="black" />
                <Text style={styles.informationFormmat}>시간</Text>
              </View>
              <Text style={{...styles.informationFormmat, flex:6}}>
                {state.startHour} ~ {state.EndHour}
              </Text>
              <Text>
              </Text>
            </View>
          </View>

          <View style={styles.homeDetailInformation}>
            <View style={{flexDirection:"row"}}>
              <View style={{flexDirection:"row", flex:4}}>
              <Ionicons name="people" size={24} color="black" />
                <Text style={styles.informationFormmat}>모집인원</Text>
              </View>
              <Text style={{...styles.informationFormmat, flex:6}}>
              {state.people} / {state.recruit}
              </Text>
              <Text>
              </Text>
            </View>
          </View>

          <View style={styles.homeDetailInformation}>
            <View style={{flexDirection:"row"}}>
              <View style={{flexDirection:"row", flex:4}}>
              <Ionicons name="people" size={24} color="black" />
                <Text style={styles.informationFormmat}>위치</Text>
              </View>
              <Text style={{...styles.informationFormmat, flex:6}}>
                {state.place}
              </Text>
              <Text>
              </Text>
            </View>
          </View>
          
          <View style={styles.homeDetailMap}>
            <Text style={{fontSize:36}}>
              지도 준비중
            </Text>
          </View>
          
          <View style={{backgroundColor:"#ffffff", padding:20}}>
            <View style={{flexDirection:"row", justifyContent:"space-between", backgroundColor:"#eeeeee",paddingTop:15, paddingBottom:10, borderRadius:20, }}>
              <Text style={{paddingLeft:20}}>
                {state.place}
              </Text>
              <Text style={{marginRight:20, backgroundColor:"#ffffff", padding:5, borderRadius:20, color:theme.psColor, fontWeight:"bold"}}>
                길찾기
              </Text>
            </View>
          </View>
          
          
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeDetailPageView:{
    flex:1,
  },
  homeDetailHeaderView:{
    flex:1,
  },
  homeDetailContentView:{
    flex:8,
  },
  homeDetailTitle:{
    padding:10,
    backgroundColor:"#ffffff",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  homeDetailAppManageBtn:{
    backgroundColor:theme.psColor, 
    color:"#ffffff",
    padding:5, 
    borderRadius:20, 
    width:80, 
    fontWeight:"bold", 
    textAlign:"center",
  },
  homeDetailContent:{
    backgroundColor:"#ffffff",
    padding:10,
    borderBottomWidth: 1, // 하단 테두리의 두께
    borderBottomColor: "#cccccc", // 하단 테두리의 색상
  },
  homeDetailInformation:{
    backgroundColor:"#ffffff",
    padding:10,
    borderBottomWidth: 1, // 하단 테두리의 두께
    borderBottomColor: "#cccccc", // 하단 테두리의 색상
  },
  informationFormmat:{
    fontWeight:"bold",
    marginTop:3,
    marginLeft:5
  },
  homeDetailMap:{
    ...theme.centerStyle,
    backgroundColor:"#ffffff",
    height:200,
    borderBottomWidth: 1, // 하단 테두리의 두께
    borderBottomColor: "#cccccc", // 하단 테두리의 색상
  }
});