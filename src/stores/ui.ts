import { create } from 'zustand';

interface UiState {
  navOpen: boolean;
  toggleNavOpen: () => void;
  closeNav: () => void;
}

const useUiStore = create<UiState>((set) => ({
  navOpen: false,
  toggleNavOpen: () => set((state) => ({ navOpen: !state.navOpen })),
  closeNav: () => set(() => ({ navOpen: false })),
}));

export default useUiStore;
