import type { Meta, StoryObj } from "@storybook/react-vite";

import { ThemeSwitch } from "./theme-switch";

const meta = {
  title: "Controls/ThemeSwitch",
  component: ThemeSwitch,
} satisfies Meta<typeof ThemeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
