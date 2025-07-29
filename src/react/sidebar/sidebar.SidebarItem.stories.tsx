import type { Meta, StoryObj } from "@storybook/react-vite";

import { SidebarItem } from "./sidebar";
import { House } from "@phosphor-icons/react";

const meta: Meta<typeof SidebarItem> = {
  component: SidebarItem,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Dashboard",
    icon: <House />,
    href: "/dashboard",
  },
};
