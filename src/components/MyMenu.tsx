import { Menu } from "react-admin";

export const MyMenu = () => (
  <Menu
    sx={(theme) => ({
      "& .MuiListItemButton-root": {
        borderRadius: 1,
        mx: 1,
        mb: 0.5,
        color: theme.palette.text.secondary,
        "&:hover": {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.action.hover,
        },
        "&.Mui-selected": {
          color: theme.palette.text.primary,
          fontWeight: 500,
          backgroundColor: theme.palette.action.hover,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
      "& .MuiListItemIcon-root": {
        minWidth: 40,
        color: "inherit",
      },
    })}
  />
);
