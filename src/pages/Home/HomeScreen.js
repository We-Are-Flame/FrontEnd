/** @format */

import * as React from "react";
import { View, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert("여기 홈 스크린임.")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Home Screen
      </Text>
    </View>
  );
}
