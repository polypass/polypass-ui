import * as react from 'react';
import { ReactNode } from 'react';

declare function Alert(props: {
    title: string;
    children?: ReactNode;
}): react.JSX.Element;

export { Alert };
