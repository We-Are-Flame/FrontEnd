import React,{useEffect,useState} from "react";
import { View,StyleSheet, Text,Button,TextInput } from "react-native";

import { Entypo } from '@expo/vector-icons';
import theme from '../../../styles/theme';

export default function ChatDetailPage() {
  return (
    <View style={styles.chatDetailPageView}>
      <View style={styles.chatInput}>
        <View style={styles.chatInputImage}>
          <Entypo name="image" size={30} color="black" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Message"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatDetailPageView:{
    flex:1,
    justifyContent:"flex-end"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex:8,
  },
  chatInput:{
    flexDirection:"row",
  },
  chatInputImage:{
    padding:10,
    flex:1,
    ...theme.centerStyle
  }
});
