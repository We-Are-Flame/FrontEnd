/** @format */

// /** @format */

// import * as React from "react";
// import { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import LionImg from "../../../../../assets/lion.webp";
// import { Button, Card } from "react-native-paper";
// import theme from "../../../../styles/theme";
// export default function ManageCard({ state, flag, onAccept, onReject }) {
//   return (
//     <View style={{ ...styles.manageCard, width: flag ? "98%" : "100%" }}>
//       {state ? (
//         <Card style={{}}>
//           <View style={{ flexDirection: "row" }}>
//             <View style={styles.cardCoverContainer}>
//               <Card.Cover style={styles.cardImageStyle} source={LionImg} />
//             </View>
//             <View style={styles.cardContentStyle}>
//               <Text style={{ fontSize: 20, fontWeight: "600" }}>
//                 {state.nickname}
//               </Text>
//               <View style={{ flex: 1, flexDirection: "row" }}>
//                 <View style={{ flex: 2, justifyContent: "center" }}>
//                   <Text>온도</Text>
//                   <Text>{state.temper}º</Text>
//                 </View>
//                 <View style={{ flex: 8 }}>
//                   <Card.Actions>
//                     <Button
//                       style={{ borderWidth: 0 }}
//                       buttonColor={theme.psColor}
//                       textColor="white"
//                       onPress={() => onAccept(state.id)}
//                     >
//                       수락
//                     </Button>
//                     <Button
//                       style={{ borderWidth: 0 }}
//                       buttonColor="#fa9797"
//                       textColor="white"
//                       onPress={() => onReject(state.id)}
//                     >
//                       거절
//                     </Button>
//                   </Card.Actions>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </Card>
//       ) : null}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   manageCard: {
//     flex: 2,
//     marginTop: 5,
//   },
//   cardCoverContainer: {
//     ...theme.centerStyle,
//     flex: 2.7,
//     padding: 5,
//   },
//   cardImageStyle: { flexGrow: 0, width: "100%", height: "100%" },
//   cardContentStyle: {
//     flex: 7.3,
//     paddingVertical: 12,
//     paddingHorizontal: 5,
//   },
// });

/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LionImg from "../../../../../assets/lion.webp";
import { Button } from "react-native-paper";
import theme from "../../../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Pressable } from "react-native";
export default function ManageCard({
  checkItemsHandler,
  id,
  isAllChecked,
  participantData,
}) {
  const [checked, setChecked] = useState(false);

  const allCheckHandler = () => {
    setChecked(isAllChecked);
    checkItemsHandler(id, isAllChecked);
  };

  const checkHanlder = () => {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked;
      checkItemsHandler(id, newChecked);
      return newChecked;
    });
  };

  useEffect(() => {
    allCheckHandler();
  }, [isAllChecked]);

  return (
    <View style={styles.manageCardView}>
      <View style={styles.manageCard}>
        <View style={{ justifyContent: "center", flex: 0.4 }}>
          <Pressable onPress={checkHanlder}>
            {checked ? (
              <Ionicons name="checkmark-circle" size={24} color="black" />
            ) : (
              <Ionicons name="ellipse-outline" size={24} color="black" />
            )}
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.image}
            source={{ uri: participantData.profile_image }}
            contentFit="cover"
          />
        </View>
        <View style={{ justifyContent: "center", flex: 1 }}>
          <Text style={{ fontWeight: "600" }}>{participantData.nickname}</Text>
          <Text>온도 {participantData.temperature} º</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Button
                style={{ borderWidth: 0 }}
                buttonColor={theme.btnRejectColor}
                textColor="white"
              >
                거절
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  manageCardView: {
    height: theme.screenHeight / 10,
    // borderWidth: 1
  },
  manageCard: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    borderWidth: 1,
    borderColor: "lightgray",
    width: 60,
    height: 60,
    borderRadius: theme.screenWidth / 6,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
