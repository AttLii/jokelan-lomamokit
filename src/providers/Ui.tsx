"use client";
import type { PropsWithChildren } from "react";
import { useReducer, useEffect } from "react";
import { UiContext, initialState, reducer } from '../contexts/ui.tsx';

export default function Ui({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const scrollLockClasses = ["overflow-hidden", "sm:overflow-auto"];
    state.navOpen
      ? document.body.classList.add(...scrollLockClasses)
      : document.body.classList.remove(...scrollLockClasses);
  }, [state.navOpen]);

  return (
    <UiContext.Provider value={{ state, dispatch }}>
      {children}
    </UiContext.Provider>
  );
}