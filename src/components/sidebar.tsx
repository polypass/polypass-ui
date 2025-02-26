// (C) 2025 Polypass <legal@polypass.ca>. All rights reserved.

"use client";

import { Button, Tooltip } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  name: string;
  icon: React.ReactNode;
  href: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  icon,
  href,
}) => {
  const pathname = usePathname();
  const getDynamicColor = (path: string) =>
    pathname === path ? "primary" : "default";

  return (
    <>
      <Button
        startContent={icon}
        className="justify-start hidden lg:flex"
        as={Link}
        href={href}
        color={getDynamicColor(href)}
      >
        {name}
      </Button>
      <Tooltip content={name} placement="right">
        <Button
          isIconOnly
          className="lg:hidden"
          as={Link}
          href={href}
          color={getDynamicColor(href)}
        >
          {icon}
        </Button>
      </Tooltip>
    </>
  );
};

type SidebarProps = {
  children:
    | React.ReactElement<typeof SidebarItem>
    | React.ReactElement<typeof SidebarItem>[];
};

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <div className="p-5 border-r border-default-200 lg:w-64 w-20 flex flex-col gap-4 transition-all">
      {children}
    </div>
  );
};
