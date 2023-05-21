import { createSlice } from "@reduxjs/toolkit";

const initialCurrentUser = {
  authorized: "notAuthorized",
  idInstance: "",
  apiTokenInstance: "",
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialCurrentUser,
  reducers: {
    setCurrentUser(state, action) {
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    },
    setAuth(state, action) {
      state.authorized = action.payload;
    },
  },
});

export const { setCurrentUser, setAuth } = currentUserSlice.actions;

export default currentUserSlice.reducer;
