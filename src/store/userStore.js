import { create } from "zustand";

const userStore = create((set) => ({
  userToken: "",
  setUserToken: (token) => set({ userToken: token }),
}));

export default userStore;
