import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
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
