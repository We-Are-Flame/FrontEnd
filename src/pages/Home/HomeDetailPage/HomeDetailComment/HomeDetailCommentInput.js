/** @format */
/** @format */

import React,{useState,useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";

import theme from './../../../../styles/theme';
import { post_headers } from '../../../../utils/StaticData';
import axios from 'axios';

export default function HomeDetailCommentInput({id}) {
  const [text,setText] = useState("");

  const submitComment = ()=>{
    axios.post(`http://118.67.128.48/api/meetings/${id}/comments`,
    {description:text},
    {headers:post_headers}
    )
    .then((res)=>{
      console.log(res.data);
      setText("");
    })
    .catch((err)=>{
      console.log(err);
    })
  };



  return (
    <View style={styles.homeDetailCommentInputView}>
      <TextInput
        style={styles.inputComment}
        onChangeText={setText}
        value={text}
        placeholder="문의할 내용을 입력해주세요."
      />
      <TouchableOpacity style={styles.submitComment} onPress={submitComment}>
        <Text style={{color:"#ffffff"}}>
          전송
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  homeDetailCommentInputView:{
    backgroundColor:"#ffffff",
    padding:20,
    flexDirection:"row",
  },
  inputComment:{
    backgroundColor:"#eeeeee",
    borderRadius:20,
    padding:5,
    flex:4,
  },
  submitComment:{
    padding:10,
    backgroundColor:theme.psColor,
    borderRadius:20,
    ...theme.centerStyle
  }
});