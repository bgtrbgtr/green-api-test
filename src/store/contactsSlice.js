import { createSlice } from "@reduxjs/toolkit";

const initialContactsList = [];

const contactsListSlice = createSlice({
  name: "contactList",
  initialState: initialContactsList,
  reducers: {
    addNewContact(state, action) {
      const newContact = action.payload[0];
      const contactMessages = action.payload[1];
      if (!state.find((contact) => contact.chatId === newContact.chatId)) {
        newContact.activeChat = false;
        newContact.prevMessages = contactMessages;
        state.push(newContact);
      }
    },
    refreshChatHistory(state, action) {
      let activeContact = state.find(
        (contact) => contact.chatId === action.payload.chatId
      );
      if (activeContact) {
        activeContact.prevMessages.unshift(action.payload.newMessage);
      }
    },
    changeActiveStatus(state, action) {
      let activeContact = state.find(
        (contact) => contact.chatId === action.payload.chatId
      );
      activeContact.activeChat = !activeContact.activeChat;
      state.forEach((contact) => {
        if (contact !== activeContact) {
          contact.activeChat = false;
        }
      });
    },
  },
});

export const { addNewContact, changeActiveStatus, refreshChatHistory } =
  contactsListSlice.actions;

export default contactsListSlice.reducer;
