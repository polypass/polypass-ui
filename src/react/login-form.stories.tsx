import type { Meta, StoryObj } from "@storybook/react-vite";

import { LoginForm } from "./login-form";
import { fn } from "storybook/internal/test";

const meta = {
  component: LoginForm,
  args: {
    onSubmit: fn(),
    children: (
      <div className="space-y-1">
        <h1 className="text-lg font-bold">Sign in to your account</h1>
        <p className="text-sm text-default-500">
          Welcome back. Please sign in to continue.
        </p>
      </div>
    ),
  },
  argTypes: {
    children: { table: { disable: true } },
    color: {
      control: "select",
      options: [
        "background",
        "default",
        "primary",
        "secondary",
        "warning",
        "danger",
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-full m-8 max-w-96 mx-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "default",
    hideBranding: false,
  },
};

export const WithErrorMessage: Story = {
  args: {
    color: "default",
    error: "Something went wrong. Please try again later.",
    hideBranding: false,
  },
};

export const NoBranding: Story = {
  args: {
    color: "default",
    hideBranding: true,
  },
};
