import { create } from "zustand";

interface UiState {
  navOpen: boolean;
  toggleNavOpen: () => void;
}

const useUiStore = create<UiState>((set) => ({
  navOpen: false,
  toggleNavOpen: () => set((state) => ({ navOpen: !state.navOpen })),
}));

export default useUiStore;
