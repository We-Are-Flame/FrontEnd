/** @format */

import Carousel from "react-native-snap-carousel";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";

//<MyCarousel entries={carouselArr} widthProps={Dimensions.get('window').width} heightProps={200} layout="default"/>
export default function MyCarousel({
  entries,
  widthProps,
  heightProps,
  layout,
}) {
  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.imageView, { height: heightProps }]}>
        {/* 여기에 이미지나 다른 내용을 추가할 수 있습니다. */}
        <Image
          source={item}
          style={{
            // width: "100%",
            // height: undefined,
            // aspectRatio: 1,
            // borderRadius: 10,
            width: widthProps - 100,
            height: heightProps,
          }} // 예시 크기, 원하는 대로 조절
          // contentFit="scale-down" // 또는 "contain", "stretch" 등
          contentFit="cover"
        />
      </View>
    );
  };

  return (
    <Carousel
      data={entries}
      renderItem={renderItem}
      sliderWidth={widthProps}
      itemWidth={widthProps - 100}
      layout={layout}
    />
  );
}

const styles = StyleSheet.create({
  imageView: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
