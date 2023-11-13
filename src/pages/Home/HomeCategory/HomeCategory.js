/** @format */

import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { category } from '../../../utils/StaticData';

import CategoryItem from './CategoryItem/CategoryItem';


export default function HomeCategory() {
  return (
    <View style={styles.homeCategoryView}>
      <ScrollView horizontal={true}>
      {
        category.map((data,index)=>{
          return <CategoryItem data={data} key={index} index={index}/>
        })
      }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  homeCategoryView:{
    flexDirection:"row",
  }
});