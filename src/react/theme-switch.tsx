// (C) 2025 Polypass <legal@polypass.ca>. All rights reserved.

"use client";

import { SwitchProps, useSwitch } from "@heroui/react";
import { IconWeight } from "@phosphor-icons/react";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { useIsSSR } from "@react-aria/ssr";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { FC } from "react";

type ThemeSwitchProps = {
  className?: string;
  classNames?: SwitchProps["classNames"];
  weight?: IconWeight;
  size?: number;
};

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
  size = 18,
  weight,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${
      theme === "light" || isSSR ? "dark" : "light"
    } mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto",
              "bg-transparent",
              "rounded-lg",
              "flex items-center justify-center",
              "group-data-[selected=true]:bg-transparent",
              "!text-default-500",
              "pt-px",
              "px-0",
              "mx-0",
            ],
            classNames?.wrapper
          ),
        })}
      >
        {!isSelected || isSSR ? (
          <Sun size={size} weight={weight} />
        ) : (
          <Moon size={size} weight={weight} />
        )}
      </div>
    </Component>
  );
};
