import theme from "../../../styles/theme";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Button, TextInput } from "react-native-paper";
import userStore from "../../../store/userStore";
export default function UnivAuth() {
  const { userData, setUserData } = userStore();
  const [isSend, setIsSend] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const navigation = useNavigation();

  /// userStore에 isAuth를 추가 인증이 됐으면 isAuth를 true로 바꾼다. 그 후 마이페이지에서 또 처리 (인증마크)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.univAuthView}>
        <View style={{ flex: 0.8 }}>
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
              height: theme.screenHeight / 40,
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
              value={userEmail}
              onChangeText={setUserEmail}
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
          <View
            style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
          >
            <View style={{ flex: 1.5, justifyContent: "center" }}>
              <TextInput
                mode="outlined"
                activeOutlineColor="black"
                placeholderTextColor="gray"
                placeholder="인증번호 입력"
                value={authCode}
                onChangeText={setAuthCode}
                outlineColor="lightgray"
                style={{ backgroundColor: "white" }}
              />
            </View>
            <View style={{ flex: 0.2 }} />
            <View style={{ flex: 1, justifyContent: "center" }}>
              <TouchableOpacity
                disabled={!authCode}
                onPress={() => {
                  Alert.alert("인증 성공", "인증이 완료되었습니다.", [
                    {
                      text: "확인",
                      onPress: () => {
                        navigation.goBack();
                      },
                    },
                  ]);
                }}
              >
                <Button
                  labelStyle={styles.btnLabelStyle}
                  style={{ height: 50, ...theme.centerStyle }}
                  mode="contained"
                  buttonColor={authCode ? theme.psColor : "lightgray"}
                >
                  인증번호 확인
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <View style={{ flex: 1, marginTop: theme.screenHeight / 60 }}>
          <TouchableOpacity
            disabled={!userEmail}
            onPress={() => {
              setIsSend(!isSend);
            }}
          >
            <Button
              mode="contained"
              buttonColor={userEmail ? theme.psColor : "lightgray"}
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
  btnLabelStyle: {
    fontWeight: "bold",
    fontSize: theme.screenWidth / 24,
  },
});
