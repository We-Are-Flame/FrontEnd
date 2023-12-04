/** @format */

import { Image } from 'expo-image';
import React, { useState } from "react";
import lion from "../../../../assets/lion.webp";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

export default function ReviewModalItem({imageSource,name, temperature}) {
  const [rating, setRating] = useState(3);

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={18}
            color="gold"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.reviewModalItemView}>
      <Image
        source={imageSource || lion}
        style={{ width: 40, height: 40, flex:1 }} // 예시 크기, 원하는 대로 조절
        resizeMode="cover" // 또는 "contain", "stretch" 등
      />
      <Text style={styles.reviewTextStyle}>라이언</Text>
      <Text style={styles.reviewTextStyle}>520º</Text>
      <View
        style={{ flexDirection: 'row',marginTop:10, flex:1, marginRight:20 }}
      >
        {renderStars()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewModalItemView:{
    flexDirection:"row",
    marginBottom:10,
  },
  reviewTextStyle:{
    flex:1,
    justifyContent:"center",
    marginTop:10,
  }
});
