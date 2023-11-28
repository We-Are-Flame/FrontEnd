/** @format */

import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import theme from "../styles/theme";
export default function ImageViewer({
  placeholderImageSource,
  selectedImage,
  widthProps,
  heightProps,
}) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;

  return (
    <Image
      source={imageSource}
      style={
        selectedImage
          ? styles.image
          : widthProps && heightProps
          ? { ...styles.image, width: widthProps, height: heightProps }
          : { ...styles.image, width: 100, height: 100 }
      }
    />
  );
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    // borderWidth: 1,
    // borderColor: theme.profileBorderColor,
    // width: 100,
    // height: 100,
    // borderRadius: theme.screenWidth / 6,
    // ...theme.centerStyle,
  },
});
