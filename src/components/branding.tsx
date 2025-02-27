// (C) 2025 Polypass <legal@polypass.ca>. All rights reserved.

"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";

import logo_dark from "../assets/logo/polypass_dark.svg";
import logo_light from "../assets/logo/polypass_light.svg";
import logo_monodark from "../assets/logo/polypass_monodark.svg";
import logo_monolight from "../assets/logo/polypass_monolight.svg";

export const polypassLogoSvgs = {
  color: {
    dark: logo_dark,
    light: logo_light,
  },
  mono: {
    dark: logo_monodark,
    light: logo_monolight,
  },
};

interface LogoProps {
  mono?: boolean;
  color?: "light" | "dark";
  scale?: number;
}

export const PolypassLogo: React.FC<LogoProps> = ({ mono, color, scale }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) color = "light";

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <Image
      alt="Polypass Logo"
      height={28 * (scale || 1)}
      src={polypassLogoSvgs[mono ? "mono" : "color"][color || currentTheme]}
      width={36 * (scale || 1)}
    />
  );
};
