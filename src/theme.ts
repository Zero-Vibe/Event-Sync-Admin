import { createTheme, alpha } from "@mui/material/styles";

const sharedConfig = {
  typography: {
    fontFamily: '"Inter", sans-serif',
    button: {
      textTransform: "none" as const,
    },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: ({ theme }) => ({
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }),
        "*": {
          boxSizing: "border-box",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
          borderRadius: 12,
          overflow: "hidden",
          transition: "all 0.15s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            borderColor: theme.palette.divider,
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
        root: {
          fontWeight: 500,
          borderRadius: 6,
          minHeight: 32,
          padding: "4px 12px",
          fontSize: "0.75rem",
          lineHeight: 1.25,
          transition: "opacity 0.15s ease-in-out",
          "&:hover": {
            opacity: 0.8,
          },
        },
        sizeLarge: {
          minHeight: 36,
          padding: "8px 16px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          minHeight: 36,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
            borderWidth: 2,
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
        input: {
          padding: "8px 12px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-focused": {
            color: theme.palette.text.primary,
          },
        }),
        shrink: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 56,
          "@media (min-width: 600px)": {
            minHeight: 56,
          },
        },
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
          fontSize: "0.875rem",
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
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          marginLeft: 8,
          marginRight: 8,
          marginBottom: 4,
          color: theme.palette.text.secondary,
          "&:hover": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.action.hover,
          },
          "&.Mui-selected": {
            color: theme.palette.text.primary,
            fontWeight: 500,
            backgroundColor: theme.palette.action.hover,
          },
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
          color: "inherit",
        },
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
