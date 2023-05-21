import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  name: "",
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    setModalIsOpen(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setModalIsOpen } = modalSlice.actions;

export default modalSlice.reducer;
