import * as React from "react";
import theme from "../../../styles/theme";
import Header from "../../../components/Header";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function AccountInfo() {
  return (
    <View style={styles.accountInfoView}>
      <Text>Account Info</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  accountInfoView: {
    flex: 1,
  },
  
});
