/** @format */

import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../../../styles/theme";
const icon = [
  <MaterialIcons
    name="sports-baseball"
    size={theme.categoryIconSize}
    color="black"
  />,
  <Entypo
    name="pencil"
    size={theme.categoryIconSize}
    color="black"
    style={{ marginLeft: 5 }}
  />,
  <FontAwesome5
    name="wine-bottle"
    size={theme.categoryIconSize}
    color="black"
  />,
  <FontAwesome name="gamepad" size={theme.categoryIconSize} color="black" />,
  <MaterialIcons
    name="volunteer-activism"
    size={theme.categoryIconSize}
    color="black"
  />,
  <AntDesign name="aliwangwang" size={theme.categoryIconSize} color="black" />,
];

export default function CategoryItem({ data, index }) {
  return (
    <TouchableOpacity>
      <View style={styles.categoryItemView}>
        {icon[index]}
        <Text>{data}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryItemView: {
    paddingVertical: 20,
    paddingRight: 40,
    ...theme.centerStyle,
  },
});
