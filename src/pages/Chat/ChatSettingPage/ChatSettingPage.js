import React,{useEffect,useState} from "react";
import { View, Text,Button,StyleSheet,TextInput,TouchableOpacity,FlatList,Switch } from "react-native";

import { Image } from 'expo-image';

import imageSource from "../../../../assets/kitchingLogo.png";

import axios from 'axios';
import { API_URL } from '@env';
import theme from '../../../styles/theme';
import userStore from '../../../store/userStore';
import ChatUserItem from './ChatUserItem/ChatUserItem';

export default function ChatSettingPage({ navigation,route }) {
  const [users,setUsers] = useState([]);
  const [isModify,setIsModify] = useState(false);
  const [title,setTitle] = useState("고양이 츄르");
  const [alarm, setAlarm] = useState(false);

  const { userToken, userData } = userStore();

  const toggleSwitch = () => {
    axios.put(`${API_URL}/api/chat/${route.params.roomId}/notification`,{
      is_notification:!alarm
    },{
      headers: {
        "Content-Type": `application/json`,
        Authorization: "Bearer " + `${userToken}`,
      },
    })
    .then((res)=>{
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
    setAlarm((alarm) => !alarm);
  }


  const changeTitle = ()=>{
    axios.put(`${API_URL}/api/chat/${route.params.roomId}/title`,{
      title:title
    },{
      headers: {
        "Content-Type": `application/json`,
        Authorization: "Bearer " + `${userToken}`,
      },
    })
    .then((res)=>{
      console.log(res.data);
      setIsModify(false);
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  const outChatRoom = ()=>{
    axios.delete(`${API_URL}/api/chat/${route.params.roomId}/user`,null,{
      headers: {
        "Content-Type": `application/json`,
        Authorization: "Bearer " + `${userToken}`,
      },
    })
    .then((res)=>{
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    axios.get(`${API_URL}/api/chat/${route.params.roomId}/users`, null,{
      headers: {
        "Content-Type": `application/json`,
      },
    })
    .then((res)=>{
      setUsers(res.data.content);
    })
    .catch((err)=>{
      console.log(err);
    })
    
  },[route.params.roomId]);

  useEffect(()=>{
    axios.get(`${API_URL}/api/chat/${route.params.roomId}/notification`,{
      headers: {
        "Content-Type": `application/json`,
        Authorization: "Bearer " + `${userToken}`,
      },
    })
    .then((res)=>{
      setAlarm(res.data.is_notification);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[route.params.roomId]);


  return (
    <View style={styles.chatSettingPageView}>
      <View style={styles.chatThumbnail}>
        <Image
          source={imageSource}
          style={{
            width: 120,
            height: 120,
            marginTop: 3,
            marginRight: 5,
            borderRadius:20,
          }} // 예시 크기, 원하는 대로 조절
          resizeMode="cover" // 또는 "contain", "stretch" 등
        />
      </View>
      <View style={styles.chatSettingContentView}>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
          <Text style={styles.chatSettingContentLabel}>채팅방 이름</Text>
          {
            (isModify) ?
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={changeTitle}>
                <Text style={{color:theme.psColor,marginRight:30}}>변경</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setIsModify(false)}>
                <Text style={{color:theme.psColor}}>취소</Text>
              </TouchableOpacity>
            </View>
            :
            <TouchableOpacity onPress={()=>setIsModify(true)}>
              <Text style={{color:theme.psColor}}>수정</Text>
            </TouchableOpacity>
          }
          
        </View>
        {
          (isModify) ?
          <TextInput
            style={styles.inputComment}
            onChangeText={setTitle}
            value={title}
          />:
          <Text style={{color:"gray", marginTop:5}}>고양이 츄르</Text>
        }
        <Text style={[styles.chatSettingContentLabel, {marginTop:20}]}>대화 상대</Text>
        <FlatList
          data={users}
          renderItem={({ item }) => <ChatUserItem users={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{flexDirection:"row",...theme.centerStyle, justifyContent:"space-between", marginTop:20}}>
          <View>
            <Text style={styles.chatSettingContentLabel}>알림</Text>
            <Text style={{color:"gray"}}>채팅 알림을 받습니다.</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={alarm ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={alarm}
          />
        </View>

        <TouchableOpacity style={{marginTop:50}} onPress={outChatRoom}>
          <Text style={{fontSize:20, color:"red"}}>채팅방 나가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatSettingPageView:{
    marginTop:100,
  },
  chatThumbnail:{
    flex:1,
    ...theme.centerStyle
  },
  chatSettingContentView:{
    padding:20,
    marginTop:60,
  },
  chatSettingContentLabel:{
    fontSize:20
  },
  inputComment:{
    backgroundColor:"#ffffff",
  }
});
