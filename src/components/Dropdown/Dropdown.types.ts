export interface MenuItem {
  label: string;
  onClick: () => void;
  isDelete?: boolean;
}

export interface DropdownProps {
  menuItems: MenuItem[];
}
