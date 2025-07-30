import type { Meta, StoryObj } from "@storybook/react-vite";

import { LoginForm, FormHeader } from "./login-form";
import { fn } from "storybook/internal/test";
import { PolypassLogo } from "./branding/logo";

const meta = {
  component: LoginForm,
  args: {
    onSubmit: fn(),
  },
  argTypes: {
    headerContent: { table: { disable: true } },
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
    hideBranding: false,
    noBackground: false,
  },
};

export const WithErrorMessage: Story = {
  args: {
    error: "Something went wrong. Please try again later.",
    hideBranding: false,
    noBackground: false,
  },
};

export const NoBranding: Story = {
  args: {
    hideBranding: true,
    noBackground: false,
  },
};

export const NoBackground: Story = {
  args: {
    hideBranding: true,
    noBackground: true,
  },
};

export const CustomHeader: Story = {
  args: {
    hideBranding: false,
    noBackground: false,
    headerContent: (
      <div className="flex flex-col items-center gap-2">
        <PolypassLogo />
        <FormHeader
          title="Create a new account"
          body="Lorem ipsum? Dolor sit."
        />
      </div>
    ),
  },
};
