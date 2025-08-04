// (C) 2025 Polypass <legal@polypass.ca>. All rights reserved.

import { Button, Tooltip } from "@heroui/react";
import { createContext, useContext } from "react";

const SidebarPathContext = createContext<string | undefined>(undefined);

interface SidebarItemProps {
  name: string;
  icon: React.ReactNode;
  href: string;
  as?: React.ElementType;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  name,
  icon,
  href,
  as,
}) => {
  const currentPath = useContext(SidebarPathContext);

  const getDynamicColor = (path: string) =>
    currentPath === path ? "primary" : "default";

  return (
    <>
      <Button
        startContent={icon}
        className="justify-start hidden lg:flex"
        as={as || "a"}
        href={href}
        color={getDynamicColor(href)}
        fullWidth
      >
        {name}
      </Button>
      <Tooltip content={name} placement="right">
        <Button
          isIconOnly
          className="lg:hidden"
          as={as || "a"}
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
  currentPath: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ children, currentPath }) => {
  return (
    <div className="p-5 border-r border-default-200 lg:w-64 w-20 flex flex-col gap-4 transition-all">
      <SidebarPathContext.Provider value={currentPath}>
        {children}
      </SidebarPathContext.Provider>
    </div>
  );
};
