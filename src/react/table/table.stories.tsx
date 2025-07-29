import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { TableView } from "./table";

const meta = {
  component: TableView,
} satisfies Meta<typeof TableView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PopulatedTable: Story = {
  args: {
    label: "Employee",
    emptyContent: "No employees found :(",
    data: [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        dob: "1990-01-15",
        phone: "555-1234",
      },
      {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        dob: "1985-06-22",
        phone: "555-5678",
      },
      {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        dob: "1992-09-10",
        phone: "555-8765",
      },
      {
        id: 4,
        name: "Dana White",
        email: "dana@example.com",
        dob: "1988-12-05",
        phone: "555-4321",
      },
    ],
    columns: [
      { name: "Name", uid: "name" },
      { name: "Email", uid: "email" },
      { name: "Date of Birth", uid: "dob" },
      { name: "Phone Number", uid: "phone" },
    ],
    onAdd: fn(),
  },
};

export const EmptyTable: Story = {
  args: {
    label: "Employee",
    emptyContent: "No employees found :(",
    data: [],
    columns: [
      { name: "Name", uid: "name" },
      { name: "Email", uid: "email" },
      { name: "Date of Birth", uid: "dob" },
      { name: "Phone Number", uid: "phone" },
    ],
  },
};
