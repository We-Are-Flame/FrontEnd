/** @format */

import React,{useEffect,useState} from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Image } from "expo-image";

import Spinner from "../../../../assets/loading_spinner.svg";

import HomeContentItem from './HomeContentItem/HomeContentItem';
import axios from 'axios';
import { headers } from './../../../utils/StaticData';
import { API_URL } from "@env";


export default function HomeContent({selectedSort}) {
  const [homeList,setHomeList] = useState([]);

  useEffect(()=>{
    axios.get(`${API_URL}/api/meetings?start=0&end=10&sort=${selectedSort}`,null,
    {headers:headers})
    .then((res)=>{
      setHomeList(res.data.content);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[selectedSort]);

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