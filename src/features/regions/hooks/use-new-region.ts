import { create } from "zustand";

type NewRegiontState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewRegion = create<NewRegiontState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
