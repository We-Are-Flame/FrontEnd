import { create } from "zustand";

const userStore = create((set) => ({
  userToken: "",
  isLogin: false,
  userData: {
    nickname: "",
    profile_image: "",
    temperature: 0,
    my_meetings: 0,
  },
  setUserData: (userData) => {
    set((state) => ({ userData: { ...state.userData, ...userData } }));
  },
  setNickname: (nickname) => {
    set((state) => ({ userData: { ...state.userData, nickname } }));
  },
  setProfileImage: (profileImage) => {
    set((state) => ({
      userData: { ...state.userData, profile_image: profileImage },
    }));
  },
  setIsLogin: (isLogin) => set({ isLogin: isLogin }),
  setUserToken: (token) => set({ userToken: token }),
  setTemperature: (temperature) => set({ temperature: temperature }),
  setMyMeetings: (meetings) => set({ meetings: meetings }),
}));

export default userStore;
