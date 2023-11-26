/** @format */

import { View, StyleSheet } from "react-native";
import axios from "axios";
import Postcode from "@actbase/react-daum-postcode";
import { useNavigation } from "@react-navigation/core";
export default function FindAddress() {
  const navigation = useNavigation();

  return (
    <View style={styles.findAddressView}>
      <Postcode
        style={{ width: "100%", height: "100%" }}
        onSelected={async (data) => {
          // console.log(data["address"]);
          placeAddress = data["address"];
          const url =
            "https://dapi.kakao.com/v2/local/search/address.json?query=" +
            encodeURI(placeAddress);
          const axiosResult = await axios({
            url: url,
            method: "get",
            headers: {
              Authorization: "KakaoAK 6f4ebd50a7864e00f7a85b690e3cc694", //KakaoAK 뒤에 위에서 얻은 REST API KEY를 입력
            },
          }).then((res) => {
            console.log(`${placeAddress} 이거임 진짜로`);
            navigation.navigate("CreateClubPostPage", {
              screen: "CreateClubPostPage",
              address: placeAddress,
              latitude: res.data.documents[0].address.y,
              longitude: res.data.documents[0].address.x,
            });
            console.log(res.data.documents[0].address.y);
            console.log(res.data.documents[0].address.x);
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
