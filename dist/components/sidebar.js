"use client";

// src/components/sidebar.tsx
import { Button, Tooltip } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var SidebarItem = ({
  name,
  icon,
  href
}) => {
  const pathname = usePathname();
  const getDynamicColor = (path) => pathname === path ? "primary" : "default";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        startContent: icon,
        className: "justify-start hidden lg:flex",
        as: Link,
        href,
        color: getDynamicColor(href),
        children: name
      }
    ),
    /* @__PURE__ */ jsx(Tooltip, { content: name, placement: "right", children: /* @__PURE__ */ jsx(
      Button,
      {
        isIconOnly: true,
        className: "lg:hidden",
        as: Link,
        href,
        color: getDynamicColor(href),
        children: icon
      }
    ) })
  ] });
};
var Sidebar = ({ children }) => {
  return /* @__PURE__ */ jsx("div", { className: "p-5 border-r border-default-200 lg:w-64 w-20 flex flex-col gap-4 transition-all", children });
};
export {
  Sidebar,
  SidebarItem
};
//# sourceMappingURL=sidebar.js.map