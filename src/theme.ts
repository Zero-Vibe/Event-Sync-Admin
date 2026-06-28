import { createTheme } from "@mui/material/styles";

const sharedConfig = {
  typography: {
    fontFamily: '"Inter", sans-serif',
    button: {
      textTransform: "none" as const,
    },
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
          overflow: "hidden",
          transition: "all 0.15s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 500,
          borderRadius: 6,
          padding: "6px 16px",
          fontSize: "0.8125rem",
          transition: "opacity 0.15s ease-in-out",
          "&:hover": {
            opacity: 0.8,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
            borderWidth: 1,
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-focused": {
            color: theme.palette.text.primary,
          },
        }),
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiTableCell-head": {
            fontWeight: 600,
            fontSize: "0.8125rem",
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.action.hover,
          },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottomColor: theme.palette.divider,
          padding: "12px 16px",
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }),
      },
    },
    RaToolbar: {
      styleOverrides: {
        root: {
          padding: "12px 0",
        },
      },
    },
    RaSimpleForm: {
      styleOverrides: {
        root: {
          maxWidth: "800px",
        },
      },
    },
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
