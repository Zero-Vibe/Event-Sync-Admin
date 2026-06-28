import { AppBar } from "react-admin";
import { Box } from "@mui/material";

export const MyAppBar = () => (
  <AppBar
    sx={(theme) => ({
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: `${theme.palette.background.default}cc`,
      backdropFilter: "blur(12px)",
      boxShadow: "none",
      "& .MuiToolbar-root": {
        width: "100%",
        maxWidth: 1152,
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: { xs: 2, sm: 3, md: 4 },
        paddingRight: { xs: 2, sm: 3, md: 4 },
      },
    })}
  />
);
