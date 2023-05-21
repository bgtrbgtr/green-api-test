import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "./currentUserSlice";
import modalSlice from "./modalSlice";
import contactsListSlice from "./contactsSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    modal: modalSlice,
    contactsList: contactsListSlice,
  },
});
