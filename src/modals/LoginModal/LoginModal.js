import React from "react";
import { View, Text } from "react-native";
import { Modal, Portal } from "react-native-paper";
import theme from "../../styles/theme";

const LoginModal = ({ visible, onDismiss }) => {
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
          <View style={styles.modalContentBottom}></View>
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
    width: "75%",
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
    fontSize: 24,
    fontWeight: "500",
  },
  modalContentMiddle: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 15,
    fontWeight: "400",
  },
  modalContentBottom: {
    flex: 1,
  },
};

export default LoginModal;
