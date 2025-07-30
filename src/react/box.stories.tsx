import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box } from "./box";

const meta = {
  component: Box,
  args: {
    children: (
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
        perspiciatis ipsum vero saepe optio similique, rerum fuga est, sunt
        nostrum minima cum, deleniti quaerat fugit ea. Maiores quam nihil
        inventore.
      </p>
    ),
  },
  argTypes: {
    children: { table: { disable: true } },
    color: {
      control: "select",
      options: ["background", "primary", "secondary", "warning", "danger"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-full m-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fill: Story = {
  args: {
    className: "max-w-96",
    variant: "fill",
    radius: "md",
    hasShadow: false,
    color: "background",
  },
};

export const Blur: Story = {
  args: {
    className: "max-w-96",
    variant: "blur",
    radius: "md",
    hasShadow: false,
    color: "background",
  },
};

export const Outline: Story = {
  args: {
    className: "max-w-96",
    variant: "outline",
    radius: "md",
    hasShadow: false,
    color: "primary",
  },
};

export const Shadow: Story = {
  args: {
    className: "max-w-96",
    variant: "fill",
    radius: "md",
    hasShadow: true,
    color: "background",
  },
};
