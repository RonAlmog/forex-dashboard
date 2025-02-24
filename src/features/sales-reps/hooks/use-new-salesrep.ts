import { create } from "zustand";

type NewSalesRepState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewSalesRep = create<NewSalesRepState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
