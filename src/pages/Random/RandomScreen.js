/** @format */

import React from "react";
import { View, Text } from "react-native";
import Header from './../../components/Header';

import theme from '../../styles/theme';

export default function RandomScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{ flex: theme.headerSpace, backgroundColor: theme.psColor }}
      ></View>

      <Header />
      <View style={{flex:7}}>
      </View>
    </View>
  );
}
