import { Sidebar } from "react-admin";

export const MySidebar = () => (
  <Sidebar
    sx={(theme) => ({
      "& .MuiDrawer-paper": {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 300,
        boxSizing: "border-box",
      },
      "& .MuiListItemButton-root": {
        borderRadius: 1,
        mx: 1,
      },
    })}
  />
);
