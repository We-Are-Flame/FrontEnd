/** @format */

import * as React from "react";
import theme from "../../../styles/theme";
import { Fragment } from "react";

import { View, Text, StyleSheet } from "react-native";
import ClubCard from "../ClubCard/ClubCard";

export default function MeetingComponent({ groupedMeetings }) {
  const convertDate = (inputDate) => {
    const dateObj = new Date(inputDate);

    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const returnDay = daysOfWeek[dateObj.getDay()];

    return returnDay;
  };

  return (
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
              {`${date} (${convertDate(meetings[0].time_output.start_time)})`}
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
