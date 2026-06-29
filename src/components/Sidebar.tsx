import type { ReactNode } from "react";
import { Sidebar as RASidebar } from "react-admin";

export const Sidebar = ({ children }: { children?: ReactNode }) => (
  <RASidebar
    sx={(theme) => ({
      "& .MuiDrawer-paper": {
        borderRight: `1px solid ${theme.palette.divider}`,
        boxSizing: "border-box",
      },
      "& .MuiListItemButton-root": {
        borderRadius: 1,
        mx: 1,
      },
    })}
  >
    {children}
  </RASidebar>
);