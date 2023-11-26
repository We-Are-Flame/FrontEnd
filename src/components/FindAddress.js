/** @format */

import { View } from "react-native";
import axios from "axios";
import { StyleSheet } from "react-native";
import Postcode from "@actbase/react-daum-postcode";
export default function FindAddress() {
  return (
    <View style={styles.findAddressView}>
      <Postcode
        style={{ width: "100%", height: "100%" }}
        onSelected={async (data) => {
          console.log(data["address"]);
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
    