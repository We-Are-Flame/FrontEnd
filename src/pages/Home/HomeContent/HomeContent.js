/** @format */

import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Image } from "expo-image";

import Spinner from "../../../../assets/loading_spinner.svg";

import HomeContentItem from './HomeContentItem/HomeContentItem';
import axios from 'axios';
import { headers } from './../../../utils/StaticData';


export default function HomeContent() {
  const [homeList,setHomeList] = useState([]);

  useEffect(()=>{
    axios.get(`http://118.67.128.48/api/meetings?start=0&end=10&sort=soon`,null,
    {headers:headers})
    .then((res)=>{
      setHomeList(res.data.content);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <View style={styles.homeContentView}>
      {
        (homeList.length === 0) ? 
          <Image
            source={Spinner}
            contentFit="cover" // 또는 fill
          /> : 
        homeList.map((state,index)=>{
          return <HomeContentItem state={state} key={index}/>
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({

});