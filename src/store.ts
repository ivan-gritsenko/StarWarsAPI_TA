import { create } from "zustand";
import { Person } from "./types/Person";

interface StarWarsState {
  currentPerson: Person | null;
  setPerson: (person: Person) => void;
  removePerson: () => void;
}

interface ModalState {
  isLoading: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useStarWarsStore = create<StarWarsState>((set) => ({
  currentPerson: null,
  setPerson: (person: Person) =>
    set({
      currentPerson: {
        ...person,
      },
    }),
  removePerson: () => set({ currentPerson: null }),
}));

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useStarWarsStore;
