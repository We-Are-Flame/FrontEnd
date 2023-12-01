/** @format */

import * as React from "react";
import theme from "../../../styles/theme";
import { useState, Fragment, useEffect } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ClubCard from "../ClubCard/ClubCard";

const convertDate = (inputDate) => {
  const dateObj = new Date(inputDate);

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const returnDay = daysOfWeek[dateObj.getDay()];

  return returnDay;
};

const FirstRoute = ({ myClubData }) => {
  const meetings = myClubData.content || [];

  const groupMeetingsByDate = (meetings) => {
    return meetings.reduce((grouped, meeting) => {
      const date = meeting.time.start_time.split("T")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(meeting);
      return grouped;
    }, {});
  };

  const groupedMeetings = groupMeetingsByDate(meetings);

  return (
    <ScrollView style={{ flex: 1 }}>
      {Object.keys(groupedMeetings).length !== 0 ? (
        <View style={styles.clubCardView}>
          <View style={{ width: "90%" }}>
            {Object.entries(groupedMeetings).map(([date, meetings]) => (
              <Fragment key={date}>
                <Text
                  style={{
                    ...styles.clubDate,
                    marginTop: 20,
                    height: theme.screenHeight / 25,
                  }}
                >
                  {`${date} (${convertDate(meetings[0].time.start_time)})`}
                </Text>
                <View style={{ flex: 1 }}>
                  {meetings.map((meeting, index) => (
                    <ClubCard key={index} clubData={meeting} />
                  ))}
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
  },
  myClubView: {
    flex: 1,
  },
  clubDate: {
    fontWeight: "600",
    fontSize: 20,
  },
});
