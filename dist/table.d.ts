import { FC, ReactNode } from 'react';

type TableViewProps = {
    data: Record<string, string>[];
    columns: {
        name: string;
        uid: string;
        sortable?: boolean;
    }[];
    emptyContent?: string;
    label: string;
    onAdd?: () => void;
    cellProcessor?: (item: Record<string, string>, column: string | number) => ReactNode;
};
declare const TableView: FC<TableViewProps>;

export { TableView };
