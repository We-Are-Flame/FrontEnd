/** @format */

import * as React from "react";
import theme from "../../../styles/theme";
import axios from "axios";
import { useState, Fragment, useEffect } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { myclubData } from "../../../utils/StaticData";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ClubCard from "../ClubCard/ClubCard";
import { API_URL } from "@env";
import { render } from "react-dom";

const FirstRoute = ({ myClubData }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      {Object.keys(myClubData).length !== 0 && myClubData.count !== 0 ? (
        <View style={styles.clubCardView}>
          <View style={{ width: "90%" }}>
            {myClubData.content.map((meeting, index) => (
              <Fragment key={index}>
                <Text
                  style={{ ...styles.clubDate, marginTop: 20, height: 200 }}
                >
                  {meeting.time.start_time}
                </Text>
                <View style={{ flex: 1 }}>
                  <ClubCard key={index} clubData={meeting} />
                </View>
              </Fragment>
            ))}
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, ...theme.centerStyle }}>
          <Text style={{ fontSize: 16, color: "lightgray" }}>
            생성한 모임이 없습니다.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const SecondRoute = ({ meetings }) => (
  <ScrollView contentContainerStyle={{ flex: 1 }}>
    <View style={{ flex: 1, ...theme.centerStyle }}>
      <Text style={{ fontSize: 16, color: "lightgray" }}>
        참여한 모임이 없습니다
      </Text>
    </View>
  </ScrollView>
);

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: theme.psColor }}
    style={{ backgroundColor: "white" }}
    labelStyle={{ color: "black" }}
  />
);

export default function MyClub({ myClubData }) {
  const renderScene = ({ route, jumpTo, myClubData }) => {
    switch (route.key) {
      case "first":
        return <FirstRoute jumpTo={jumpTo} myClubData={myClubData} />;
      case "second":
        return <SecondRoute jumpTo={jumpTo} />;
      default:
        return null;
    }
  };
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "내가 생성한 모임" },
    { key: "second", title: "내가 참여한 모임" },
  ]);

  return (
    <View style={styles.myClubView}>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={(props) => renderScene({ ...props, myClubData })}
        onIndexChange={setIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  clubCardView: {
    flex: 1,
    ...theme.centerStyle,
    padding: 5,
    backgroundColor: "red",
  },
  myClubView: {
    flex: 1,
    backgroundColor: "blue",
  },
  clubDate: {
    fontWeight: "600",
    fontSize: 20,
  },
});
