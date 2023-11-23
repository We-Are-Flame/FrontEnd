/** @format */

import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { commentData } from '../../../../utils/StaticData';

import HomeDetailCommentItem from './HomeDetailCommentItem';

export default function HomeDetailComment() {
  return (
    <>
      <View style={styles.homeDetailCommentView}>
        <Text style={styles.homeDetailCommentTitle}>
          댓글
        </Text>
        <Text style={{fontWeight:"bold", marginLeft:10, marginTop:2}}>
          {commentData.data.length}개
        </Text>
      </View>
      {
        (commentData.data).map((data,index)=>{
          return <HomeDetailCommentItem data={data} key={index} />
        })
      }
      
    </>
  );
}

const styles = StyleSheet.create({
  homeDetailCommentView:{
    backgroundColor:"#ffffff",
    padding:20,
    flexDirection:"row",
  },
  homeDetailCommentTitle:{
    fontWeight:"bold",
    fontSize:20
  }
});