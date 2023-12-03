/** @format */
import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import theme from "./../styles/theme";

export const homeData = [
  {
    id: 1,
    nickname: "축구하고싶은사람",
    title: "축구 인원 모집",
    hour: "오후 12:00",
    date: "11월 14일 (화)",
    place: "금오공과대학교 대운동장",
    time: 2,
    recruit: 2,
    people: 1,
    hashtag: "#축구 #친목 #화요일",
  },

  {
    id: 2,
    nickname: "야구하고싶은사람",
    title: "야구 인원 모집",
    hour: "오후 17:00",
    date: "11월 16일 (목)",
    place: "금오공과대학교 대운동장",
    time: 2,
    recruit: 5,
    people: 2,
    hashtag: "#야구 #친목 #목요일",
  },
  {
    id: 3,
    nickname: "알고리즘공부하자",
    title: "알고리즘 스터디 인원 모집",
    hour: "오후 13:00",
    date: "11월 17일 (금)",
    place: "금오공과대학교 도서관 회의실",
    time: 4,
    recruit: 4,
    people: 2,
    hashtag: "#공부 #코딩 #알고리즘",
  },
  {
    id: 4,
    nickname: "술땡긴다",
    title: "술먹을사람?",
    hour: "오후 19:00",
    date: "11월 17일 (금)",
    place: "블랙홀 상가",
    time: 6,
    recruit: 4,
    people: 2,
    hashtag: "#술 #불금 #달리자",
  },
];

export const homeDetailData = [
  {
    id: 1,
    nickname: "축구하고싶은사람",
    category: "스포츠",
    myBoard: true,
    title: "축구 인원 모집",
    content: "12시에 축구하실 분 2명 모집합니다. 물 지원해드립니다 !",
    startHour: "오후 12:00",
    EndHour: "오후 2:00",
    date: "2023년 11월 14일 (화)",
    place: "금오공과대학교 대운동장",
    time: 2,
    recruit: 2,
    people: 1,
    hashtag: "#축구 #친목 #화요일 #물지원 #어서와",
  },

  {
    id: 2,
    nickname: "야구하고싶은사람",
    category: "스포츠",
    myBoard: false,
    title: "야구 인원 모집",
    content: "17시에 야구 시원하게 한 게임하실분 초보환영 ~!~!",
    startHour: "오후 17:00",
    EndHour: "오후 21:00",
    date: "2023년 11월 16일 (목)",
    place: "금오공과대학교 대운동장",
    time: 2,
    recruit: 5,
    people: 2,
    hashtag: "#야구 #친목 #목요일",
  },
  {
    id: 3,
    nickname: "알고리즘공부하자",
    category: "공부",
    myBoard: false,
    title: "알고리즘 스터디 인원 모집",
    content: "알고리즘 공부로 코딩테스트 부실분 구합니다. 진심모드입니다.",
    startHour: "오후 13:00",
    EndHour: "오후 18:00",
    date: "2023년 11월 17일 (금)",
    place: "금오공과대학교 도서관 회의실",
    time: 4,
    recruit: 4,
    people: 2,
    hashtag: "#공부 #코딩 #알고리즘",
  },
  {
    id: 4,
    nickname: "술땡긴다",
    category: "술",
    myBoard: true,
    title: "술먹을사람?",
    content: "여자친구랑 헤어졌습니다.. 힘든데 술 마실분 구합니다.. (여자만)",
    startHour: "오후 19:00",
    EndHour: "오후 00:00",
    date: "2023년 11월 17일 (금)",
    place: "블랙홀 상가",
    time: 6,
    recruit: 4,
    people: 2,
    hashtag: "#술 #불금 #달리자",
  },
];
export const myclubData = [
  {
    date: "2023년 09월 10일 (토)",
    clubs: [
      {
        clubName: "축구 한겜 하실분",
        location: "금오공과대학교 운동장",
        time: "오후 6:50 ~ 오후 10:50",
      },
      {
        clubName: "야구 한겜 하실분",
        location: "구미 대운동장",
        time: "오후 7:50 ~ 오후 11:00",
      },
    ],
  },
  {
    date: "2023년 11월 23일 (토)",
    clubs: [
      {
        clubName: "술 한잔 적실분",
        location: "블랙홀 상가",
        time: "오후 20:00 ~ 오후 21:00",
      },
    ],
  },
];
export const manageData = [
  {
    clubname: "우리는 불꽃", // 모임 이름
    peoples: [
      {
        id: 1,
        nickname: "라이언",
        temper: 85,
        img: "../../../../assets/lion.webp",
      },
      {
        id: 2,
        nickname: "춘식",
        temper: 70,
        img: "../../../../assets/chunsik.webp",
      },
      {
        id: 3,
        nickname: "네오",
        temper: 60,
        img: "../../../../assets/neo.webp",
      },
    ],
  },
  {
    clubname: "우리는 물방울", // 모임 이름
    peoples: [
      {
        id: 4,
        nickname: "춘식",
        temper: 90,
        img: "../../../../assets/chunsik.webp",
      },
      {
        id: 5,
        nickname: "네오",
        temper: 80,
        img: "../../../../assets/neo.webp",
      },
    ],
  },
];

export const category = ["스포츠", "공부", "술", "게임", "봉사활동", "기타"];

export const timeArr = ["1시간", "2시간", "3시간", "4시간"];

export default function Button(props) {
  const { title, setTime, time } = props;

  const clickBtn = () => {
    setTime(title);
  };
  return (
    <Pressable
      style={[styles.button, title === time ? styles.activeBtn : ""]}
      onPress={clickBtn}
    >
      <Text style={[styles.text, title === time ? styles.activeText : ""]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 4,
    backgroundColor: "#eeeeee",
    height: 40,
    marginTop: 12,
    marginBottom: 12,
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#aaaaaa",
  },
  activeBtn: {
    backgroundColor: theme.psColor,
    color: "#ffffff",
  },
  activeText: {
    color: "#ffffff",
  },
});

export const commentData = {
  status: "success",
  data: [
    {
      profile_image: "../../../../assets/lion.webp", // 댓글 작성자의 프로필 이미지
      nickname: "태헌", // 댓글 작성자의 닉네임
      content: "모임에 강아지 데려가도 되나요?", // 댓글 내용
    },
    {
      profile_image: "../../../../assets/chunsik.webp", // 댓글 작성자의 프로필 이미지
      nickname: "재성", // 댓글 작성자의 닉네임
      content: "모임 끝나고 술 한잔 하고싶은데 어떤가요?", // 댓글 내용
    },
  ],
};

export const participateList = {
  count: 2,
  content: [
    {
      id: 1,
      nickname: "라이언",
      profile_image: "kakao.com/qwe13341",
      temperature: 960,
    },
    {
      id: 2,
      nickname: "육군",
      profile_image: "kakao.com/qwe13341",
      temperature: 960,
    },

    {
      id: 3,
      nickname: "어피치",
      profile_image: "kakao.com/qwe13341",
      temperature: 960,
    },
    {
      id: 4,
      nickname: "프로도",
      profile_image: "kakao.com/qwe13341",
      temperature: 960,
    },
    {
      id: 3,
      nickname: "춘식이",
      profile_image: "kakao.com/qwe13341",
      temperature: 960,
    },
    {
      id: 4,
      nickname: "네오",
      profile_image: "kakao.com/qwe13341",
      temperature: 960,
    },
  ],
};

export const headers = {
  "Content-Type": `application/json`,
};

export const post_headers = {
  "Content-Type": `application/json`,
  Authorization:
    "Bearer " +
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzOk1FTUJFUiIsInVzZXJJZCI6MywiZW1haWwiOiJmb3JldmVyMjk2QG5hdmVyLmNvbSIsImlhdCI6MTcwMTAxNzIxMiwiZXhwIjoxNzAxMDI3MjEyfQ._6P9HJxnF3FUvNaolLrLgEVFN3FruLNrM1w2KNROCJg",
};

export const sort = ["soon", "new", "title"];
