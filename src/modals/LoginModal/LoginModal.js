import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Modal, Portal } from "react-native-paper";
import theme from "../../styles/theme";
import loginIcon from "../../../assets/kakao_login.png";
import loginLarge from "../../../assets/kakao_login_large_wide.png";
import { useNavigation } from "@react-navigation/native";
const LoginModal = ({ visible, onDismiss }) => {
  const navigation = useNavigation();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalContentTop}>
            <Text style={styles.modalTitle}>가입하기</Text>
          </View>
          <View style={styles.modalContentMiddle}>
            <Text style={styles.modalText}>
              아래의 소셜계정과 연동하여 가입할 수 있습니다.
            </Text>
          </View>
          <View style={styles.modalContentBottom}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("KaKaoLogin", { screen: "KaKaoLogin" })
              }
              style={{ width: "100%", height: "100%" }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                source={loginLarge}
                contentFit="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = {
  modalContainer: {
    ...theme.centerStyle,
    backgroundColor: "white",
    borderRadius: 10,
    width: theme.screenWidth * 0.75,
    height: "24%",
    alignSelf: "center",
  },
  modalContent: {
    padding: 10,
    flex: 1,
  },
  modalContentTop: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalTitle: {
    fontSize: theme.screenHeight / 30,
    fontWeight: "500",
  },
  modalContentMiddle: {
    flex: 0.3,
    ...theme.centerStyle,
  },
  modalText: {
    fontSize: theme.screenWidth / 29,
    fontWeight: "400",
  },
  modalContentBottom: {
    flex: 1,
    ...theme.centerStyle,
  },
};

export default LoginModal;
