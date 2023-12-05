/** @format */

import { View, StyleSheet, ActivityIndicator } from "react-native";
import theme from "../styles/theme";
export default function Loading() {
  return (
    <View style={styles.loadingComponentView}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingComponentView: {
    flex: 1,
    ...theme.centerStyle,
  },
});
