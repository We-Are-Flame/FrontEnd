/** @format */

import { create } from "zustand";

const searchStore = create((set) => ({
  searchText: "",
  submitText: "",
  showResult: false,

  setShowResult: (isShow) => set({ showResult: isShow }),
  setSearchText: (newText) => set({ searchText: newText }),
  setSubmitText: (newSubmitText) => set({ submitText: newSubmitText }),
}));

export default searchStore;
