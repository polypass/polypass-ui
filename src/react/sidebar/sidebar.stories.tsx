import type { Meta, StoryObj } from "@storybook/react-vite";

import { Sidebar, SidebarItem } from "./sidebar";
import { Gear, House } from "@phosphor-icons/react";

const meta = {
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPath: "/settings",
    children: [
      <SidebarItem key="home" name="Home" href="/home" icon={<House />} />,
      <SidebarItem
        key="settings"
        name="Settings"
        href="/settings"
        icon={<Gear />}
      />,
    ],
  },
};
