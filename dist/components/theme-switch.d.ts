import { SwitchProps } from '@heroui/react';
import { FC } from 'react';

interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
}
declare const ThemeSwitch: FC<ThemeSwitchProps>;

export { ThemeSwitch, type ThemeSwitchProps };
