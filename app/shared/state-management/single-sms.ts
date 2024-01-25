import { create } from "zustand";
import { UseGetInformation, Tags, UseTextSMS } from "../model";

export const useTag = create<Tags>(set => ({
  tags: [],
  addTag: (tag: string): void =>
    set(prevState => {
      if (!prevState.tags.includes(tag)) {
        return {
          ...prevState,
          tags: [...prevState.tags, tag]
        };
      }
      return prevState;
    }),
  removeTag: (tag): void => set(prevState => ({ tags: prevState.tags.filter(item => item !== tag) })),
  clear: (): void => set({ tags: [] })
}));
export const useGetInformation = create<UseGetInformation>(set => ({
  phoneNumber: "",
  id: "",
  getUser: (number: string, id: string): void => set({ phoneNumber: number, id: id }),
  clear: (): void => set({ phoneNumber: "", id: "" })
}));
export const useTextSMS = create<UseTextSMS>(set => ({
  textSMS: { value: "", error: false, message: "" },
  setTextSMS: ({ value, error, message }): void =>
    set({
      textSMS: {
        ...(value && { value }),
        ...(error && { error }),
        ...(message && { message })
      }
    }),
  clear: (): void => set({ textSMS: { value: "", error: false, message: "" } })
}));
