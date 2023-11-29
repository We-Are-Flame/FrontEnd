/** @format */
/** @format */

import React,{useEffect} from "react";
import { View, Text } from "react-native";

export default function ChatScreen({ navigation }) {
  
  useEffect(()=>{
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  },[]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Chat Screen
      </Text>
    </View>
  );
}
