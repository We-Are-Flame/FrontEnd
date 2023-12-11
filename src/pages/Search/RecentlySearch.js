// /** @format */

// import { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";

// import theme from "../../styles/theme";

// import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";

// import { API_URL } from "@env";
// import searchStore from "../../store/searchStore";
// import RecentlyItems from "./RecentlyItems";

// export default function RecentlySearch({ data }) {
//   const { searchText, setSearchText } = searchStore();

//   useEffect(() => {
//     console.log(searchText);
//   }, [searchText]);

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.contentHeader}>
//         <Text style={{ fontWeight: "600", fontSize: 16 }}>최근 검색</Text>
//         <Text style={{ fontSize: 16 }}>전체 삭제</Text>
//       </View>

//       <View style={styles.recentlyItems}>
//         {data.content &&
//           data.content.map((item, index) => {
//             return <RecentlyItems item={item} key={index} />;
//           })}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   contentHeader: {
//     flexGrow: 0,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   recentlyItems: {
//     flexGrow: 1,
//   },
//   randomScreenHeaderSpace: {
//     flex: theme.headerSpace,
//     backgroundColor: theme.psColor,
//   },
// });

// /** @format */

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Dimensions,
//   StyleSheet,
//   TextInput,
//   ScrollView,
// } from "react-native";

// import theme from "../../styles/theme";
// import axios from "axios";
// import userStore from "../../store/userStore";
// import { API_URL } from "@env";
// import searchStore from "../../store/searchStore";
// import RecentlySearch from "./RecentlySearch";
// import { recentData } from "../../utils/StaticData";

// export default function SearchContent() {
//   const { searchText, setSearchText } = searchStore();
//   const [datalength, setDataLenght] = useState(1);
//   useEffect(() => {
//     console.log(searchText);
//   }, [searchText]);

//   return (
//     <View style={styles.searchContentView}>
//       {recentData.count > 10 ? (
//         <ScrollView style={{ flex: 1, padding: 20 }}>
//           <RecentlySearch data={recentData} />
//         </ScrollView>
//       ) : (
//         <View style={{ flex: 1, padding: 20 }}>
//           <RecentlySearch data={recentData} />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   searchContentView: { backgroundColor: "white", flex: 1 },

//   contentHeader: {
//     flexGrow: 0,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   recentlyItems: {
//     flexGrow: 1,
//   },
//   randomScreenHeaderSpace: {
//     flex: theme.headerSpace,
//     backgroundColor: theme.psColor,
//   },
// });
// /** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import theme from "../../styles/theme";
import axios from "axios";
import userStore from "../../store/userStore";
import { API_URL } from "@env";
import searchStore from "../../store/searchStore";
import { recentData } from "../../utils/StaticData";
import RecentlyItems from "./RecentlyItems";

export default function RecentlySearch() {
  const { searchText, setSearchText } = searchStore();
  const [datalength, setDataLenght] = useState(1);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.searchContentView}>
        {recentData.count > 10 ? (
          <ScrollView style={{ flex: 1, padding: 20 }}>
            <View style={styles.contentHeader}>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>최근 검색</Text>
              <Text style={{ fontSize: 16 }}>전체 삭제</Text>
            </View>

            <View style={styles.recentlyItems}>
              {/* {recentData.content &&
                recentData.content.map((data, index) => {
                  return <RecentlyItems data={data} key={index} />;
                })} */}
            </View>
          </ScrollView>
        ) : (
          <View style={{ flex: 1, padding: 20 }}>
            <View style={styles.contentHeader}>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>최근 검색</Text>
              <Text style={{ fontSize: 16 }}>전체 삭제</Text>
            </View>

            <View style={styles.recentlyItems}>
              {/* {recentData.content &&
                recentData.content.map((data, index) => {
                  return <RecentlyItems data={data} key={index} />;
                })} */}
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  searchContentView: { backgroundColor: "white", flex: 1 },
  contentHeader: {
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recentlyItems: {
    flexGrow: 1,
  },
  randomScreenHeaderSpace: {
    flex: theme.headerSpace,
    backgroundColor: theme.psColor,
  },
});
