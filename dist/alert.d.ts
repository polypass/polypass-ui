import { FC, ReactNode } from 'react';

declare const Alert: FC<{
    title: string;
    children?: ReactNode;
}>;

export { Alert };
