/** @format */

import * as React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Header from './Header/Header';
import HomeContent from './HomeContent/HomeContent';
import HomeCategory from './HomeCategory/HomeCategory';
import NavContainer from '../../components/NavContainer';

export default function HomeScreen() {
  return (
    <View style={styles.homeScreenView}>
      <View style={styles.homeScreenHeader}>
        <Header />
      </View>
      <View style={styles.homeScreenCategory}>
        <Text style={styles.homeScreenCategoryText}>카테고리 별로</Text>
        <Text style={styles.homeScreenCategoryText}>확인해 보세요!</Text>
        <HomeCategory />
      </View>
      <View style={styles.homeScreenContent}>
        <ScrollView>
          <HomeContent />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreenView:{
    flex:1,
  },
  homeScreenHeader: {
    flex: 1,
  },
  homeScreenCategory:{
    flex:1,
    margin:30,
  }, 
  homeScreenContent:{
    flex:5,
  },
  homeScreenCategoryText:{
    fontSize:18,
    fontWeight:'bold',
  },
});
