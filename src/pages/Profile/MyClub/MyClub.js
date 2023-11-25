/** @format */

import * as React from "react";
import theme from "../../../styles/theme";
import { useState, Fragment } from "react";
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

const FirstRoute = () => (
  <ScrollView contentContainerStyle={{ flex: 1 }}>
    <View style={styles.clubCardView}>
      <View style={{ width: "90%" }}>
        {myclubData.map((day, index) => (
          <Fragment key={index}>
            <Text style={{ ...styles.clubDate, marginTop: 20 }}>
              {day.date}
            </Text>
            {day.clubs.map((club, clubIndex) => (
              <ClubCard key={clubIndex} clubData={club} />
            ))}
          </Fragment>
        ))}
      </View>
    </View>
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView contentContainerStyle={{ flex: 1 }}>
    <View style={{ flex: 1, ...theme.centerStyle }}>
      <Text style={{ fontSize: 16, color: "lightgray" }}>
        참여한 모임이 없습니다
      </Text>
    </View>
  </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: theme.psColor }}
    style={{ backgroundColor: "white" }}
    labelStyle={{ color: "black" }}
  />
);

export default function MyClub() {
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
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  clubCardView: {
    ...theme.centerStyle,
    padding: 10,
    backgroundColor: "white",
  },
  myClubView: {
    flex: 1,
  },
  clubDate: {
    fontWeight: "600",
    fontSize: 20,
  },
});
