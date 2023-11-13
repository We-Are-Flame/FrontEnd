/** @format */

import * as React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Image } from "expo-image";

import { AntDesign } from '@expo/vector-icons';

import Logo from "../../../../assets/kitchingLogo.png";

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
        <AntDesign name="search1" size={24} color="black" />
        <AntDesign name="bells" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView:{
    marginTop:40,
    flexDirection:"row",
    justifyContent:"space-between"
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
    marginLeft:10,
  },
  headerIconView:{
    flexDirection:"row",
    flex:2,
    marginTop:30,
    justifyContent:"space-evenly"
  }
});