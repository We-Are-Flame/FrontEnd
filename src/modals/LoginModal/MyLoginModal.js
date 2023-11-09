/** @format */

import { View, Text, StyleSheet } from "react-native";
import theme from "../../styles/theme";
const MyLoginModal = () => {
  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.contentTop}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>가입하기</Text>
          </View>
          <View style={styles.contentMid}>
            <Text>아래의 소셜계정과 연동하여 가입할 수 있습니다.</Text>
          </View>
          <View style={styles.contentBottom}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 5,
    ...theme.centerStyle,
  },
  modalContainer: {
    width: "75%",
    height: "25%",

    borderRadius: 15,
    backgroundColor: "white",
    ...theme.centerStyle,
  },
  contentContainer: {
    height: "90%",
    width: "95%",
    ...theme.centerStyle,
  },
  contentTop: {
    flex: 1,
    justifyContent: "flex-end",
    //borderBottomWidth: 1
  },
  contentMid: { flex: 1, justifyContent: "center" },
  contentBottom: { flex: 2 },
});

export default MyLoginModal;
