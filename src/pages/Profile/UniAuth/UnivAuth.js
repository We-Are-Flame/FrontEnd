import theme from "../../../styles/theme";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function UnivAuth() {
  const [isSend, setIsSend] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.univAuthView}>
        <View style={{ flex: 1 }}>
          <Text
            style={{ ...styles.headerText, height: theme.screenHeight / 30 }}
          >
            안녕하세요!
          </Text>
          <Text style={styles.headerText}>
            금오공대 웹 메일을 사용해 인증해 주세요.
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              color: "gray",
              height: theme.screenHeight / 30,
            }}
          >
            이메일
          </Text>
          <View style={styles.emailInputContainer}>
            <TextInput
              placeholderTextColor="gray"
              placeholder="example"
              activeOutlineColor="black"
              mode="outlined"
              outlineColor="lightgray"
              style={styles.emailInput}
            />
            <View style={{ flex: 0.2 }}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                @
              </Text>
            </View>
            <TextInput
              mode="outlined"
              style={{
                ...styles.emailInput,
                flex: 1,
                backgroundColor: "white",
              }}
              disabled
              value="kumoh.ac.kr"
            />
          </View>
        </View>
        {isSend ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextInput
              mode="outlined"
              activeOutlineColor="black"
              placeholderTextColor="gray"
              placeholder="인증 번호 입력"
              outlineColor="lightgray"
              style={{ backgroundColor: "white" }}
            />
          </View>
        ) : null}

        <View style={{ flex: 1, marginTop: theme.screenHeight / 60 }}>
          <TouchableOpacity
            onPress={() => {
              setIsSend(!isSend);
            }}
          >
            <Button
              mode="contained"
              buttonColor="lightgray"
              textColor="white"
              labelStyle={{
                fontWeight: "bold",
                fontSize: theme.screenWidth / 24,
              }}
              style={{
                ...theme.centerStyle,
                height: theme.screenHeight / 18,
              }}
            >
              인증문자 받기
            </Button>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 5 }} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  univAuthView: {
    flex: 1,
    padding: 10,

    backgroundColor: "white",
  },
  headerText: { fontSize: 24, fontWeight: "600" },
  emailInputContainer: {
    flex: 1,
    ...theme.centerStyle,
    flexDirection: "row",
  },
  emailInput: {
    flex: 1.5,
    backgroundColor: "white",
    borderColor: "lightgray",
  },
});
