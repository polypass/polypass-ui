import { ThemeColors } from "@heroui/react";
import clsx from "clsx";
import { FC, ReactNode } from "react";

export type BoxProps = {
  className?: string;
  variant?: "fill" | "blur" | "outline";
  hasShadow?: boolean;
  radius?: "none" | "sm" | "md" | "lg";
  color: keyof ThemeColors;
  children: ReactNode;
};

export const Box: FC<BoxProps> = ({
  className,
  variant = "fill",
  hasShadow,
  color = "background",
  radius = "md",
  children,
}) => {
  return (
    <div
      className={clsx(
        "w-full relative flex flex-col gap-8 text-center items-center justify-center p-4",
        "rounded-" + radius,
        className,
        {
          ["bg-" + color]: variant == "fill",
          "shadow-md": !!hasShadow,
          [`border border-${color}`]: variant == "outline",
          "backdrop-blur-md bg-background/60": variant == "blur",
        }
      )}
    >
      {children}
    </div>
  );
};
