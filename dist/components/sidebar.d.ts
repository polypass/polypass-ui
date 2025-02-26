interface SidebarItemProps {
    name: string;
    icon: React.ReactNode;
    href: string;
}
declare const SidebarItem: React.FC<SidebarItemProps>;
type SidebarProps = {
    children: React.ReactElement<typeof SidebarItem> | React.ReactElement<typeof SidebarItem>[];
};
declare const Sidebar: React.FC<SidebarProps>;

export { Sidebar, SidebarItem };
