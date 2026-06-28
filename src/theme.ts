import { createTheme } from "@mui/material/styles";

const sharedConfig = {
  typography: {
    fontFamily: '"Inter", sans-serif',
    button: {
      textTransform: "none" as const,
    },
  },
  shape: {
    borderRadius: 10,
  },
};

export const theme = createTheme({
  ...sharedConfig,
  palette: {
    mode: "light",
    background: {
      default: "#fcfcfc",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e1e1e",
      secondary: "#7f7f7f",
    },
    primary: {
      main: "#1e1e1e",
      contrastText: "#fcfcfc",
    },
    divider: "#e0e0e0",
    error: {
      main: "#b91c1c",
    },
    action: {
      hover: "#f5f5f5",
    },
  },
});

export const darkTheme = createTheme({
  ...sharedConfig,
  palette: {
    mode: "dark",
    background: {
      default: "#242424",
      paper: "#2e2e2e",
    },
    text: {
      primary: "#f7f7f7",
      secondary: "#999999",
    },
    primary: {
      main: "#f7f7f7",
      contrastText: "#242424",
    },
    divider: "#ffffff1a",
    error: {
      main: "#d32f2f",
    },
    action: {
      hover: "#383838",
    },
  },
});
