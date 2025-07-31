import type { Meta, StoryObj } from "@storybook/react-vite";

import { PolypassLogo } from "./logo";

const meta: Meta<typeof PolypassLogo> = {
  title: "Branding/PolypassLogo",
  component: PolypassLogo,
  parameters: {
    docs: {
      description: {
        component:
          "The Polypass logo component. Backgrounds are added in these stories for visibility purposes only and are not part of the component.",
      },
    },
  },
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
  decorators: [
    (Story) => (
      <div className="bg-neutral-800 p-8 w-fit">
        <Story />
      </div>
    ),
  ],
};

export const Dark: Story = {
  args: {
    color: "dark",
    mono: false,
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-200 p-8 w-fit">
        <Story />
      </div>
    ),
  ],
};

export const DarkMono: Story = {
  args: {
    color: "dark",
    mono: true,
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-200 p-8 w-fit">
        <Story />
      </div>
    ),
  ],
};

export const LightMono: Story = {
  args: {
    color: "light",
    mono: true,
  },
  decorators: [
    (Story) => (
      <div className="bg-neutral-800 p-8 w-fit">
        <Story />
      </div>
    ),
  ],
};
