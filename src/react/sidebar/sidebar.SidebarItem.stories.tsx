import type { Meta, StoryObj } from "@storybook/react-vite";

import { SidebarItem } from "./sidebar";
import { House } from "@phosphor-icons/react";

const meta: Meta<typeof SidebarItem> = {
  component: SidebarItem,
  title: "Layouts/Sidebar/SidebarItem",
  argTypes: {
    icon: {
      table: { disable: true },
      description: "Icon displayed to the left of the item name.",
    },
    name: { description: "The text label of the SidebarItem." },
    href: { description: "URL path this item links to." },
  },
  parameters: {
    docs: {
      description: {
        component: "A clickable nav-item inside the Sidebar navigation menu.",
      },
    },
  },
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
