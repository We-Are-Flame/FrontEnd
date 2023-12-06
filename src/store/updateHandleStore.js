/** @format */

import { create } from "zustand";

const modalHandleStore = create((set) => ({
  isManageUpdate: false,

  setIsManageUpdate: (isUpdate) => set({ isManageUpdate: !isUpdate }),
}));

export default modalHandleStore;
