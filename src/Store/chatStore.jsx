// store/chatStore.ts
import { create } from "zustand";

const useChatStore = create((set) => ({
  documentId: typeof window !== "undefined" ? localStorage.getItem("documentId") : null,
  chatId: typeof window !== "undefined" ? localStorage.getItem("chatId") : null,
  chatTitles: [],

  setDocId: (id) => {
    localStorage.setItem("documentId", id);
    set({ documentId: id });
  },

  setChatId: (id) => {
    localStorage.setItem("chatId", id);
    set({ chatId: id });
  },

  setChatTitles: (titles) => {
    set({ chatTitles: titles });
  },

  resetChatData: () => {
    localStorage.removeItem("documentId");
    localStorage.removeItem("chatId");
    set({ documentId: null, chatId: null });
  },
}));

export default useChatStore;
