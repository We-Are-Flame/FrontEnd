import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { googleAPI } from "../config/apiKey";
import { GOOGLE_API_KEY } from "@env";
const GooglePlacesInput = ({ setState }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="주소 검색"
      fetchDetails={true}
      enablePoweredByContainer={false}
      GooglePlacesSearchQuery={{ rankby: "distance" }}
      onPress={(data, details = null) => {
        // 'details'는 사용자가 선택한 장소의 상세 정보를 포함합니다.
        setState(details.formatted_address);
      }}
      keepResultsAfterBlur={true}
      query={{
        key: GOOGLE_API_KEY,
        language: "ko",
      }}
      styles={{
        textInputContainer: {
          backgroundColor: "#dddddd",
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: "#5d5d5d",
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
    />
  );
};

export default GooglePlacesInput;
