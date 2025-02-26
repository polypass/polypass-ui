"use client";

// src/components/sidebar.tsx
import { Button, Tooltip } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
var SidebarItem = ({
  name,
  icon,
  href
}) => {
  const pathname = usePathname();
  const getDynamicColor = (path) => pathname === path ? "primary" : "default";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    Button,
    {
      startContent: icon,
      className: "justify-start hidden lg:flex",
      as: Link,
      href,
      color: getDynamicColor(href)
    },
    name
  ), /* @__PURE__ */ React.createElement(Tooltip, { content: name, placement: "right" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      isIconOnly: true,
      className: "lg:hidden",
      as: Link,
      href,
      color: getDynamicColor(href)
    },
    icon
  )));
};
var Sidebar = ({ children }) => {
  return /* @__PURE__ */ React.createElement("div", { className: "p-5 border-r border-default-200 lg:w-64 w-20 flex flex-col gap-4 transition-all" }, children);
};
export {
  Sidebar,
  SidebarItem
};
//# sourceMappingURL=sidebar.js.map