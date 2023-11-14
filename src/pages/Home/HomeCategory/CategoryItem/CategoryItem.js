/** @format */

import * as React from "react";
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const icon = [
  <MaterialIcons name="sports-baseball" size={24} color="black" style={{marginLeft:5}}/>,
  <Entypo name="pencil" size={24} color="black" style={{marginLeft:5}}/>,
  <FontAwesome5 name="wine-bottle" size={24} color="black" style={{marginLeft:5}}/>,
  <FontAwesome name="gamepad" size={24} color="black" style={{marginLeft:5}}/>,
  <MaterialIcons name="volunteer-activism" size={24} color="black" style={{marginLeft:5}}/>,
  <AntDesign name="aliwangwang" size={24} color="black" style={{marginLeft:5}}/>,
];


export default function CategoryItem({data,index}) {
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
  categoryItemView:{
    padding:20,
    
  },
});