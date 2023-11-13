import * as React from "react";
import { View, Text } from "react-native";
import theme from "../../../styles/theme";
import { Button, Card } from "react-native-paper";
import LionProfile from "../../../../assets/lion.webp";
export default function ManageCard({ state, flag }) {
  return (
    <Card style={{ width: flag ? "98%" : "100%", flex: 2, marginTop: 5 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ ...theme.centerStyle, flex: 2.7, padding: 5 }}>
          <Card.Cover
            style={{
              flexGrow: 0,
              width: "100%",
              height: "100%",
            }}
            source={LionProfile}
          />
        </View>
        <View
          style={{
            flex: 7.3,
            paddingVertical: 12,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {state.nickname}
          </Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 2, justifyContent: "center" }}>
              <Text>온도</Text>
              <Text>{state.temper}º</Text>
            </View>
            <View style={{ flex: 8 }}>
              <Card.Actions>
                <Button
                  style={{ borderWidth: 0 }}
                  buttonColor={theme.psColor}
                  textColor="white"
                >
                  수락
                </Button>
                <Button
                  style={{ borderWidth: 0 }}
                  buttonColor="#fa9797"
                  textColor="white"
                >
                  거절
                </Button>
              </Card.Actions>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}
