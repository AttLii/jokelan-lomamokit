import type { Dispatch } from "react";
import { createContext } from "react";

export const initialState = {
  navOpen: false,
};

type State = typeof initialState
type NavOpenAction = { type: 'NAV_OPEN' }
type NavCloseAction = { type: 'NAV_CLOSE' }
type Action = NavOpenAction | NavCloseAction

export const UiContext = createContext<{ state: State, dispatch: Dispatch<Action> } | undefined>(undefined);

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'NAV_OPEN':
      return {
        ...state,
        navOpen: true
      };
    case 'NAV_CLOSE':
      return {
        ...state,
        navOpen: false
      };
    default:
      return state;
  }
};
