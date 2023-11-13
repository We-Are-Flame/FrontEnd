/** @format */

import * as React from "react";
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


export default function HomeContentItem({state}) {
  return (
    <View style={styles.homeContentItemView}>
      <View style={styles.homeContentItemTitle}>
        <Ionicons name="person" size={24} color="black" />
        <Text style={styles.homeContentItemTitleNickname}>
          {state.nickname}
        </Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  homeContentItemView:{
    margin:20,
    marginTop:50,
    backgroundColor:"#ffffff",
    borderRadius:20,
    padding:15,
  },
  homeContentItemTitle:{
    flexDirection:"row",
  },
  homeContentItemTitleNickname:{
    marginTop:5,
    marginLeft:5,
  }
});