import type { Meta, StoryObj } from "@storybook/react-vite";

import { PolypassLogo } from "./logo";

const meta: Meta<typeof PolypassLogo> = {
  component: PolypassLogo,
  argTypes: {
    color: {
      control: "inline-radio",
      options: ["light", "dark"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    color: "light",
    mono: false,
  },
};

export const Dark: Story = {
  args: {
    color: "dark",
    mono: false,
  },
};

export const DarkMono: Story = {
  args: {
    color: "dark",
    mono: true,
  },
};

export const LightMono: Story = {
  args: {
    color: "light",
    mono: true,
  },
};
