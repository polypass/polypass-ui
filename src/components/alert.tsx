// (C) 2025 Polypass <legal@polypass.ca>. All rights reserved.

import { ReactNode } from "react";

export function Alert(props: { title: string; children?: ReactNode }) {
  return (
    <div className="space-y-6 max-w-sm mx-auto sm:mt-6 transition-all duration-500">
      <h1 className="text-2xl font-semibold">{props.title}</h1>
      {props.children}
    </div>
  );
}
