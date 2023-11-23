/** @format */

import { Image } from 'expo-image';
import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import lion from "../../../../../assets/lion.webp";

export default function HomeDetailCommentItem({data}) {
  return (
    <View style={styles.homeDetailCommentItemView}>
      <Image
        style={{
          borderRadius: 10,
          flex:1,
        }}
        source={lion}
        contentFit="cover" // 또는 fill
      />
      <Text style={{fontWeight:"bold", flex:1}}>{data.nickname}</Text>
      <Text style={{flex:8}}>{data.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeDetailCommentItemView:{
    flexDirection:"row",
    backgroundColor:"#ffffff",
    padding:20,
  },
});