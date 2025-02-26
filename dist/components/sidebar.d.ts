interface SidebarItemProps {
    name: string;
    icon: React.ReactNode;
    href: string;
}
export declare const SidebarItem: React.FC<SidebarItemProps>;
type SidebarProps = {
    children: React.ReactElement<typeof SidebarItem> | React.ReactElement<typeof SidebarItem>[];
};
export declare const Sidebar: React.FC<SidebarProps>;
export {};
//# sourceMappingURL=sidebar.d.ts.map