import { useMemo, useState, useCallback } from "react";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { ThemeModeContext } from "../contexts/ThemeModeContext";

const theme = (mode: any) => {
  return responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: ["Roboto", "Poppins", "sans-serif"].join(","),
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              fontSize: "1em",
              borderRadius: 5,
              padding: ".8em 2em",
              verticalAlign: "middle",
            },
            sizeMedium: {
              fontSize: ".9em",
              padding: ".4em 2em",
            },
            sizeSmall: {
              fontSize: ".8em",
              padding: ".2em 1.2em",
            },
          },
        },
      },
      palette: {
        mode,
        primary: {
          main: "#692176",
          light: "#8B4B9A",
          dark: "#4A1A54",
          contrastText: "#fff",
        },
        secondary: {
          main: "#C91448",
          light: "#E04168",
          dark: "#630A23",
          contrastText: "#fff",
        },
        background: {
          default: "#000000",
          paper: "#000000",
        },
      },
    }),
  );
};

const ThemesProvider = (props: any) => {
  const localMode =
    localStorage.getItem("ihoThemeMode") || "dark";
  const [mode, setMode] = useState(localMode);

  const change = useCallback(async () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("ihoThemeMode", newMode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      change,
    }),
    [mode, change],
  );

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme(mode)}>{props.children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemesProvider;

