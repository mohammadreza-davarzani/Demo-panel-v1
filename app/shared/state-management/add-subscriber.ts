import { create } from "zustand";
import { Information, InformationState } from "../model";
export const useSubscriberInformation = create<InformationState>(set => ({
  information: { userName: undefined, password: undefined, showModal: false },
  addInfo: (newInfo: Information): void =>
    set(() => ({
      information: newInfo
    })),
  removeInfo: (): void => set({ information: { userName: undefined, password: undefined, showModal: false } })
}));
