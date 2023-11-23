/** @format */
/** @format */

import * as React from "react";
import {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";

import theme from './../../../../styles/theme';

export default function HomeDetailCommentInput() {
  const [text,setText] = useState("");

  const submitComment = ()=>{
    console.log("전송 댓글 : " + text);
    setText("");
  }

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