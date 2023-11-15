import * as React from "react";
import { StyleSheet, View } from "react-native";

import ManageContentItem from "../ManageContentItem/ManageContentItem";
import { manageData } from "../../../../utils/StaticData";

export default function ManageContentContainer() {
  return (
    <View style={styles.ManageContentContainerView}>
      <View style={styles.ManageContentContainer}>
        <View style={styles.ManageContentContainerContent}>
          {manageData.map((state, index) => {
            return <ManageContentItem state={state} key={index} />;
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ManageContentContainerView: {
    flex: 1,
    backgroundColor: "white",
  },
  ManageContentContainerSpace: { flex: 1, backgroundColor: "black" },
  ManageContentContainer: { flex: 8.5 },
  ManageContentContainerContent: {
    flex: 1,
  },
});
