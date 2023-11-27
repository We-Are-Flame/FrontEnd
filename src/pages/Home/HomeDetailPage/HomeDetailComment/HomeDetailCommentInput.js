/** @format */
/** @format */

import React, { useState, useEffect, useImperativeHandle } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import theme from "./../../../../styles/theme";
import { post_headers } from "../../../../utils/StaticData";
import axios from "axios";
import { API_URL } from "@env";

export default function HomeDetailCommentInput({ id, token }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const submitComment = () => {
    axios
      .post(
        `${API_URL}/api/meetings/${id}/comments`,
        { description: text },
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + `${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.homeDetailCommentInputView}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputComment}
          onChangeText={setText}
          value={text}
          placeholder="문의할 내용을 입력해주세요."
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        {isFocused && (
          <TouchableOpacity
            style={styles.submitComment}
            onPress={submitComment}
          >
            <Text
              style={{ color: theme.psColor, fontWeight: "600", fontSize: 18 }}
            >
              전송
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeDetailCommentInputView: {
    height: 100,
    backgroundColor: "#ffffff",
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    padding: 10,
    height: "60%",
    width: "100%",
    position: "relative",
  },
  inputComment: {
    // backgroundColor: "#eeeeee",
    // borderRadius: 20,
    // padding: 5,
    // flex: 4,
    // position: "relative",
    flex: 1,
  },
  submitComment: {
    // backgroundColor: theme.psColor,
    position: "absolute",
    right: 20,
  },
});
