
import { create } from "zustand";

type InputStore = {
  input: string;
  setInput: (value: string) => void;
  clearInput: () => void;
};

export const useInputStore = create<InputStore>((set) => ({
  input: "",

  setInput: (value) => set({ input: value }),

  clearInput: () => set({ input: "" }),
}));
