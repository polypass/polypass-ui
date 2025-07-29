import type { Meta, StoryObj } from "@storybook/react-vite";

import { Sidebar, SidebarItem } from "./sidebar";
import { Gear, House } from "@phosphor-icons/react";

const meta = {
  component: Sidebar,
  argTypes: {
    currentPath: {
      description: "The current active path to highlight the corresponding sidebar item.",
      control: "text",
    },
    children: {
      description: "The sidebar items to be rendered inside the Sidebar.",
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        component: "A Sidebar component that displays navigation items and highlights the active path.",
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    layout: "fullscreen",
    options: { storyPadding: false },
    docs: {
      description: {
        story: "The default Sidebar with two items: Home and Settings, showing how the active path highlights the Settings item.",
      },
    },
  },
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
