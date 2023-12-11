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
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { Button, TextInput } from "react-native-paper";
import userStore from "../../../store/userStore";
import { API_URL } from "@env";

export default function UnivAuth() {
  const { userData, setUserData, userToken } = userStore();
  const [isSend, setIsSend] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const navigation = useNavigation();

  const requestAuthCode = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/user/email/verification?email=${userEmail}@kumoh.ac.kr`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken,
          },
        }
      );
      console.log(response);
      setIsSend(!isSend);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyAuthCode = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/api/user/email/verification?email${userEmail}@kumoh.ac.kr&code=${authCode}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken,
          },
        }
      );
      console.log(response);
      Alert.alert("인증 성공", "인증이 완료되었습니다.", [
        {
          text: "확인",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(
      `${API_URL}/api/user/email/verification?email=${userEmail}@kumoh.ac.kr`
    );
  }, [userEmail]);
  /// userStore에 isAuth를 추가 인증이 됐으면 isAuth를 true로 바꾼다. 그 후 마이페이지에서 또 처리 (인증마크)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.univAuthView}>
        <View style={{ flexGrow: 0.1 }}>
          <View style={{ flexGrow: 0.1, justifyContent: "flex-end" }}>
            <Text style={{ ...styles.headerText }}>안녕하세요!</Text>
          </View>
          <View style={{ flexGrow: 0.1 }}>
            <Text style={styles.headerText}>
              금오공대 웹 메일을 사용해 인증해 주세요.
            </Text>
          </View>
        </View>
        <View style={styles.emailTitle}>
          <Text
            style={{
              fontSize: 16,
              color: "gray",
            }}
          >
            이메일
          </Text>
        </View>
        <View style={{ flexGrow: 0 }}>
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

          {isSend ? (
            <View style={styles.authCodeContainer}>
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
                    verifyAuthCode();
                  }}
                >
                  <Button
                    labelStyle={styles.btnLabelStyle}
                    style={styles.authcodeCheckBtn}
                    mode="contained"
                    buttonColor={authCode ? theme.psColor : "lightgray"}
                  >
                    인증번호 확인
                  </Button>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <View style={styles.authCodeConfirmContainer}>
            <TouchableOpacity disabled={!userEmail} onPress={requestAuthCode}>
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
                인증메일 받기
              </Button>
            </TouchableOpacity>
          </View>
        </View>
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
  headerText: { fontSize: theme.screenWidth / 18, fontWeight: "600" },
  emailInputContainer: {
    marginBottom: 5,
    ...theme.centerStyle,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  emailTitle: { flexGrow: 0, justifyContent: "flex-start", marginBottom: 2 },
  emailInput: {
    flex: 1.5,
    backgroundColor: "white",
    borderColor: "lightgray",
  },
  authCodeContainer: {
    flexGrow: 0,
    justifyContent: "center",
    flexDirection: "row",
  },
  authCodeConfirmContainer: {
    flexGrow: 0,
    marginTop: theme.screenHeight / 60,
  },
  authcodeCheckBtn: { height: 50, ...theme.centerStyle, borderRadius: 10 },
  btnLabelStyle: {
    fontWeight: "bold",
    width: "100%",
    fontSize: theme.screenWidth / 26,
  },
});
