/** @format */

import * as React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { homeData } from '../../../utils/StaticData';

import HomeContentItem from './HomeContentItem/HomeContentItem';


export default function HomeContent() {
  return (
    <View style={styles.homeContentView}>
      {
        homeData.map((state,index)=>{
          return <HomeContentItem state={state} key={index}/>
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({

});