/** @format */

import React, { useState, useEffect } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import HomeDetailCommentItem from "./HomeDetailCommentItem";
import axios from "axios";
import { headers } from "./../../../../utils/StaticData";

import Spinner from "../../../../../assets/loading_spinner.svg";
import { API_URL } from "@env";

export default function HomeDetailComment({ id, addedComment }) {
  const [comment, setComment] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/api/meetings/${id}/comments`, null, { headers: headers })
      .then((res) => setComment(res.data))
      .catch((err) => console.log(err));
  }, [addedComment]);

  return (
    <>
      <View style={styles.homeDetailCommentView}>
        <Text style={styles.homeDetailCommentTitle}>댓글</Text>
        <Text style={{ fontWeight: "bold", marginLeft: 10, marginTop: 2 }}>
          {comment.count}개
        </Text>
      </View>
      {comment.comment_responses ? (
        comment.comment_responses.map((data, index) => {
          return <HomeDetailCommentItem data={data} key={index} />;
        })
      ) : (
        <Image
          source={Spinner}
          contentFit="cover" // 또는 fill
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  homeDetailCommentView: {
    backgroundColor: "#ffffff",
    padding: 20,
    flexDirection: "row",
  },
  homeDetailCommentTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
