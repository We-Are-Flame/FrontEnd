/** @format */

import { View, StyleSheet } from "react-native";
import Postcode from "@actbase/react-daum-postcode";
import { useNavigation } from "@react-navigation/core";
export default function FindAddress({ route }) {
  const navigation = useNavigation();

  return (
    <View style={styles.findAddressView}>
      <Postcode
        style={{ width: "100%", height: "100%" }}
        onSelected={async (data) => {
          placeAddress = data["address"];
          navigation.navigate("CreateClubPostPage", {
            address: placeAddress,
            isLogin: route.params.isLogin,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  findAddressView: {
    flex: 1,
  },
});
