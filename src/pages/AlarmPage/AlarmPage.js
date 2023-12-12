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

import kitchingLogo from "../../../assets/kitchingLogo.png"
import AlarmItem from './AlarmItem/AlarmItem';

export default function AlarmPage() {
  const [data,setData] = useState([]);

  useEffect(()=>{
    setData([
      {
        thumbnail_image : kitchingLogo,
        title:"알림테스트1",
        content:"모임에 가입되었습니다. (모임 상세페이지로 이동)"
      },
      {
        thumbnail_image : kitchingLogo,
        title:"알림테스트2",
        content:"모임에 가입이 거부 되었습니다. (모임 상세페이지로 이동)"
      },{
        thumbnail_image : kitchingLogo,
        title:"알림테스트3",
        content:"누군가 모임에 가입하려합니다! (신청관리페이지로 이동)"
      },
    ])
  },[]);

  const renderItem = ({ item }) => {
    return <AlarmItem data={item} />;
  };

  return (
    <View style={styles.alarmPageView}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  alarmPageView:{
    borderTopWidth:1,
    borderTopColor:"#ccc",
    backgroundColor:"#fff"
  }
});
