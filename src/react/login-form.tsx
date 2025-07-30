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
import clsx from "clsx";
import { FC, ReactNode } from "react";

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

export const FormHeader: FC<{ title?: string; body?: string }> = ({
  title = "Sign in to your account",
  body = "Welcome back, please sign in to continue.",
}) => (
  <div className="space-y-1">
    <h1 className="text-lg font-bold">{title}</h1>
    <p className="text-sm text-default-500">{body}</p>
  </div>
);

type LoginFormProps = {
  error?: string;
  hideBranding?: boolean;
  noBackground?: boolean;
  className?: string;
  headerContent?: ReactNode;
  onSubmit: (formData: FormData) => void;
};

export const LoginForm: FC<LoginFormProps> = ({
  error,
  className,
  hideBranding = false,
  noBackground = false,
  onSubmit,
  headerContent = <FormHeader />,
}) => {
  return (
    <div
      className={clsx(
        "w-full relative flex flex-col text-center items-center justify-center overflow-hidden",
        className,
        {
          "rounded-md border border-default bg-background": !noBackground,
        }
      )}
    >
      <div className="p-6 w-full space-y-6">
        {headerContent}

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
    </div>
  );
};
