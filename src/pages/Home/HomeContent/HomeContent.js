/** @format */

import * as React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { homeData } from '../../../utils/StaticData';

import HomeContentItem from './HomeContentItem/HomeContentItem';


export default function HomeContent() {
  return (
    <View style={styles.homeContentView}>
      <HomeContentItem state={homeData[0]}/>
    </View>
  );
}

const styles = StyleSheet.create({

});