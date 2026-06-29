import { alpha } from "@mui/material/styles";
import { AppBar as RAAppBar } from "react-admin";
import { Typography } from "@mui/material";

export const AppBar = () => (
  <RAAppBar
    sx={(theme) => ({
      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
      backgroundColor: `${theme.palette.background.default}cc`,
      backdropFilter: "blur(12px)",
      boxShadow: "none",
      color: theme.palette.text.primary,
      "& .MuiToolbar-root": {
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: { xs: 2, sm: 3, md: 4 },
        paddingRight: { xs: 2, sm: 3, md: 4 },
      },
      "& .MuiTypography-root": {
        fontWeight: 600,
        fontSize: "0.875rem",
        letterSpacing: "-0.025em",
      },
    })}
  >
    <Typography variant="body1" sx={{ flexGrow: 1 }}>
      EventSync
    </Typography>
  </RAAppBar>
);