import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";

import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

export default function AlarmItem({data}) {

  const navigation = useNavigation();

  const goToPage = ()=>{
    navigation.navigate("HomeDetailPage", {
      id: 60,
      hostName: "이태헌",
      title: "오픈소스 보고",
    });
  }

  return (
    <TouchableOpacity style={styles.alarmItemView} onPress={goToPage}>
      <Image 
        source={data.thumbnail_image}
        style={{
          width: 40,
          height: 40,
          borderRadius: 30,
          marginRight:10,
        }}
        resizeMode="cover" // 또는 "contain", "stretch" 등
      />
      <View>
        <Text>
          {data.title}
        </Text>
        <Text>
          {data.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  alarmItemView:{
    borderBottomWidth:1,
    borderBottomColor:"#ccc",
    padding:15,
    flexDirection:"row",
    
  }
});
