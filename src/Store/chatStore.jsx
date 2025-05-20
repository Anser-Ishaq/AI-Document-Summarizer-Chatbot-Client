// store/chatStore.ts
import { create } from "zustand";

const useChatStore = create((set) => ({
  documentId: typeof window !== "undefined" ? localStorage.getItem("documentId") : null,
  chatId: typeof window !== "undefined" ? localStorage.getItem("chatId") : null,
  chatTitles: [],
  setChatMessages: [],
  chatMessagesData: null, // New state for storing chat data

  setDocId: (id) => {
    if (id === null) {
      localStorage.removeItem("documentId");
    } else {
      localStorage.setItem("documentId", id);
    }
    set({ documentId: id });
  },

  setChatId: (id) => {
    if (id === null) {
      localStorage.removeItem("chatId");
    } else {
      localStorage.setItem("chatId", id);
    }
    set({ chatId: id });
  },

  setChatTitles: (titles) => {
    set({ chatTitles: titles });
  },

  setChatMessagesData: (chatData) => { // New setter function
    set({ chatMessagesData: chatData });
  },

  resetChatData: () => {
    localStorage.removeItem("documentId");
    localStorage.removeItem("chatId");
    set({ documentId: null, chatId: null, chatTitles: [], chatMessagesData: null }); // Reset chatMessagesData
  },
}));

export default useChatStore;
