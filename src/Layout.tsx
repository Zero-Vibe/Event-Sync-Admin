import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { AppBar } from "./components/AppBar";
import { Menu } from "./components/Menu";
import { Sidebar } from "./components/Sidebar";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout appBar={AppBar} menu={Menu} sidebar={Sidebar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
