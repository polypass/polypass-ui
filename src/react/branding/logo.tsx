// (C) 2025 Polypass <legal@polypass.ca>. All rights reserved.

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import logo from "./svg";

// Removed duplicate LogoProps interface

type LogoComponentProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  alt?: string;
  src: string;
  width?: number;
  height?: number;
};

interface LogoProps {
  mono?: boolean;
  color?: "light" | "dark";
  scale?: number;
  as?: React.ComponentType<LogoComponentProps>;
}

export const PolypassLogo: React.FC<LogoProps> = ({
  mono,
  color,
  scale,
  as: ImgComponent,
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) color = "light";

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const src = logo[mono ? "mono" : "color"][color || currentTheme];
  const width = 36 * (scale || 1);
  const height = 28 * (scale || 1);

  if (ImgComponent) {
    return (
      <ImgComponent
        alt="Polypass Logo"
        src={src}
        width={width}
        height={height}
      />
    );
  }

  return <img alt="Polypass Logo" src={src} width={width} height={height} />;
};
