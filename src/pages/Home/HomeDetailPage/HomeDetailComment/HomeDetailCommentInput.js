/** @format */
/** @format */

import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import theme from "./../../../../styles/theme";
import axios from "axios";
import { API_URL } from "@env";
import userStore from "../../../../store/userStore";
import modalHandleStore from "../../../../store/modalHandleStore";

export default function HomeDetailCommentInput({
  id,
  scrollViewRef,
  setAddedComment,
}) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { userToken, isLogin } = userStore();
  const { setLoginModal } = modalHandleStore();

  const submitComment = () => {
    if (text.trim() === "") {
      return;
    }
    axios
      .post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/meetings/${id}/comments`,
        { description: text },
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + `${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setText("");
        setAddedComment(text);
        scrollViewRef.current.scrollToEnd({ animated: true });
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
            onPress={() => {
              if (isLogin) {
                submitComment();
              } else {
                setLoginModal(true);
              }
            }}
          >
            <Text
              style={{
                color: theme.psColor,
                fontWeight: "600",
                fontSize: theme.screenWidth / 23,
              }}
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
    height: theme.screenHeight / 8,
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
