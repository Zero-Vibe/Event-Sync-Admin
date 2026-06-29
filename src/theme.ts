import { createTheme, alpha } from "@mui/material/styles";

const sharedConfig = {
  sidebar: {
    width: 300,
  },
  typography: {
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
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
          fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
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
        root: ({ theme }) => ({
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
        }),
        sizeLarge: {
          minHeight: 36,
          padding: "8px 16px",
          fontSize: "0.875rem",
        },
        containedPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            opacity: 0.8,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 6,
          minHeight: 36,
          fontSize: "0.875rem",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
            borderWidth: 2,
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
        input: {
          padding: "auto 12px",
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
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: theme.palette.text.secondary,
            backgroundColor: alpha(theme.palette.action.hover, 0.5),
          },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottomColor: alpha(theme.palette.divider, 0.6),
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
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 500,
          fontSize: "0.75rem",
          height: 24,
        },
        filledSuccess: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.success.main, 0.12),
          color: theme.palette.success.main,
          border: `1px solid ${alpha(theme.palette.success.main, 0.4)}`,
        }),
        outlined: ({ theme }) => ({
          borderColor: alpha(theme.palette.divider, 0.6),
          color: theme.palette.text.secondary,
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
    RaLogin: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: "none",
          backgroundColor: theme.palette.background.default,
        }),
        card: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
          borderRadius: 12,
          boxShadow: "none",
        }),
        icon: ({ theme }) => ({
          backgroundColor: theme.palette.action.hover,
          color: theme.palette.text.secondary,
        }),
      },
    },
  },
};

const liveGreen = "#22c55e";

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
    success: {
      main: liveGreen,
      contrastText: "#1e1e1e",
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
    success: {
      main: "#4ade80",
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
