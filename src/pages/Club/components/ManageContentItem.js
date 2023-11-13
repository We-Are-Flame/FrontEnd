import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../../styles/theme";
import ManageCard from "./ManageCard";

export default function ManageContentItem({ state }) {
  const [showAllPeoples, setShowAllPeoples] = useState(false);

  const handleTogglePeoples = () => {
    setShowAllPeoples(!showAllPeoples);
  };

  return (
    <View style={styles.manageContentItemView}>
      <View style={styles.manageContentItemClub}>
        <Text style={styles.manageContentItemClubName}>{state.clubname}</Text>
        <Text style={{ flexGrow: 0.1 }}></Text>
        <Text style={{ flexGrow: 2, color: "grey" }}>
          ({state.peoples.length})
        </Text>
        <TouchableOpacity onPress={handleTogglePeoples}>
          <Ionicons
            name={showAllPeoples ? "caret-up" : "caret-down"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {showAllPeoples ? (
        <ScrollView style={styles.scrollView}>
          <View style={{ ...theme.centerStyle, flex: 1 }}>
            {state.peoples.map((person, index) => {
              return <ManageCard state={person} flag={true} key={index} />;
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={{ ...theme.centerStyle, flex: 1 }}>
          <ManageCard state={state.peoples[0]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  manageContentItemView: {
    marginTop: 60,
    height: 125,
    width: "90%",
    alignSelf: "center",
  },
  manageContentItemClub: {
    width: "100%",
    flexGrow: 0,
    flexDirection: "row",
    ...theme.centerStyle,
  },
  manageContentItemClubName: {
    fontSize: 20,
    fontWeight: "600",
    flexGrow: 0,
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },
});
