import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => (
  <>
    {/*
      This example requires updating your template:

      ```
      <html class="h-full bg-gray-100">
      <body class="h-full">
      ```
    */}
    <div className="min-h-full">
      <Navbar />
      {props.children}
    </div>
  </>
);

export default Layout;
