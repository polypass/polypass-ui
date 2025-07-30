/*
 * Copyright (C) 2025 Polypass. All rights reserved.
 * IDAM Server: Identity and Access Management Server
 *
 * All versions of IDAM Server and related software require
 * a license key signed and verified by Polypass unless
 * expressly stated otherwise. A license key does not grant
 * permission to access or use the source code. The source
 * code may only be accessed, modified, read, published, and/or
 * distributed with authorization from Polypass. Violation of these
 * terms may result in legal action to the fullest extent of the law.
 *
 * legal@polypass.ca
 */

import { Button, Form, Input } from "@heroui/react";
import { LockKey } from "@phosphor-icons/react";
import { FC } from "react";
import { Box, BoxProps } from "./box";

const inputStyles = {
  label: "text-black/50 dark:text-white/90",
  input: [
    "bg-transparent",
    "text-black/90 dark:text-white/90",
    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
  ],
  innerWrapper: "bg-transparent",
  inputWrapper: [
    "shadow-sm",
    "bg-default-200/50",
    "dark:bg-default/60",
    "backdrop-blur-xl",
    "backdrop-saturate-200",
    "hover:bg-default-200/70",
    "dark:hover:bg-default/70",
    "group-data-[focus=true]:bg-default-200/50",
    "dark:group-data-[focus=true]:bg-default/60",
    "cursor-text!",
  ],
};

type LoginFormProps = {
  error?: string;
  hideBranding?: boolean;
  onSubmit: (formData: FormData) => void;
} & Omit<BoxProps, "removeSpacing">;

export const LoginForm: FC<LoginFormProps> = ({
  error,
  className,
  color,
  variant = "outline",
  hideBranding = false,
  radius,
  onSubmit,
  children,
}) => {
  return (
    <Box
      className={className}
      variant={variant}
      radius={radius}
      color={color}
      removeSpacing={true}
    >
      <div className="p-6 w-full space-y-6">
        {children}

        <Form className="w-full space-y-4 text-left" action={onSubmit}>
          <Input
            name="email"
            type="text"
            label="Username or email"
            labelPlacement="outside-top"
            radius="sm"
            isRequired
            classNames={inputStyles}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            labelPlacement="outside-top"
            radius="sm"
            isRequired
            classNames={inputStyles}
          />
          <Button type="submit" color="primary" fullWidth radius="sm">
            Log In
          </Button>
          {error && <p className="text-danger text-xs">{error}</p>}
        </Form>
      </div>

      {!hideBranding && (
        <div className="w-full bg-default-50 border-t border-default-100 flex items-center gap-1 text-xs text-default-400 justify-center p-4">
          <LockKey weight="fill" size={14} />
          <p>Secured by PolyAuth</p>
        </div>
      )}
    </Box>
  );
};
