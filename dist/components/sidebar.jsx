// (C) 2025 Polypass <legal@polypass.ca>. All rights reserved.
"use client";
import { Button, Tooltip } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export const SidebarItem = ({ name, icon, href, }) => {
    const pathname = usePathname();
    const getDynamicColor = (path) => pathname === path ? "primary" : "default";
    return (<>
      <Button startContent={icon} className="justify-start hidden lg:flex" as={Link} href={href} color={getDynamicColor(href)}>
        {name}
      </Button>
      <Tooltip content={name} placement="right">
        <Button isIconOnly className="lg:hidden" as={Link} href={href} color={getDynamicColor(href)}>
          {icon}
        </Button>
      </Tooltip>
    </>);
};
export const Sidebar = ({ children }) => {
    return (<div className="p-5 border-r border-default-200 lg:w-64 w-20 flex flex-col gap-4 transition-all">
      {children}
    </div>);
};
