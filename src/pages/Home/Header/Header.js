/** @format */

import * as React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Image } from "expo-image";

import { AntDesign } from '@expo/vector-icons';

import Logo from "../../../../assets/kitchingLogo.png";
import theme from './../../../styles/theme';

export default function Header() {
  return (
    <View style={styles.headerView}>
      <View style={styles.headerLogoView}>
        {/* <Image
          style={{ width: "100%", height: "100%" }}
          source={Logo}
          contentFit="contain"
        /> */}
        <Text style={styles.headerLogoText}>
          KitChing
        </Text>
      </View>
      <View style={styles.headerCenter}>

      </View>
      <View style={styles.headerIconView}>
        <AntDesign name="search1" size={24} color="white" />
        <AntDesign name="bells" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView:{
    marginTop:30,
    flexDirection:"row",
    justifyContent:"space-between",
    backgroundColor:theme.psColor,
    paddingBottom:20,
  },
  headerCenter:{
    flex:2
  },
  headerLogoView:{
    flex:3,
    
  },
  headerLogoText:{
    fontWeight:'bold',
    fontSize:30,
    marginTop:25,
    marginLeft:20,
    color:"#ffffff",
  },
  headerIconView:{
    flexDirection:"row",
    flex:2,
    marginTop:30,
    justifyContent:"space-evenly"
  }
});