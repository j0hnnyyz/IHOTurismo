import { createContext, useContext } from "react";

interface State {
  mode?: string;
  change: () => void;
}

export const ThemeModeContext = createContext<State | null>(null);

export const useThemeMode = () => {
  return useContext(ThemeModeContext);
};

