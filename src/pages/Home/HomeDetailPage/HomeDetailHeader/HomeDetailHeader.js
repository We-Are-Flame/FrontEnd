/** @format */

import * as React from "react";
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

import theme from '../../../../styles/theme';

import { AntDesign } from '@expo/vector-icons';


export default function HomeDetailHeader({name}) {
  return (
    <View style={styles.homeDetailHeaderView}>
      <View style={{marginTop:30, flex:1}}>
        <AntDesign name="left" size={24} color="gray" />
      </View>
      <Text style={{fontWeight:"bold", marginTop:30, fontSize:16, flex:1, textAlign:"center"}}>
        {name}
      </Text>
      <View style={{flex:1}}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeDetailHeaderView:{
    flexDirection:"row",
    ...theme.centerStyle,
    backgroundColor:"#ffffff",
    flex:1,
    borderBottomWidth: 1, // 하단 테두리의 두께
    borderBottomColor: "#cccccc", // 하단 테두리의 색상
  }
});