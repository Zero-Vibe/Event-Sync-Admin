import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { MyAppBar } from "./components/MyAppBar";
import { MyMenu } from "./components/MyMenu";
import { MySidebar } from "./components/MySidebar";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout appBar={MyAppBar} menu={MyMenu} sidebar={MySidebar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
