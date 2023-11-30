import { create } from "zustand";

const modalHandleStore = create((set) => ({
  loginModal: false,
  profileEditModal: false,

  setLoginModal: (isShow) => set({ loginModal: isShow }),
  setProfileEditModal: (isShow) => set({ profileEditModal: isShow }),
}));

export default modalHandleStore;
