/** @format */

import { Dimensions } from "react-native";
const theme = {
  psColor: "#3467F6",
  subColor: "#f2f3f6",
  btnRejectColor: "red",
  // psColor: "#00a9cd",
  profileBorderColor: "#d0d4dc",
  categoryIconSize: 30,
  centerStyle: { justifyContent: "center", alignItems: "center" },
  screenWidth: Dimensions.get("window").width,
  screenHeight: Dimensions.get("window").height,
  headerSpace: 0.4,
  detailStateBtnStyle: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default theme;
