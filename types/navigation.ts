// types/navigation.ts
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavigationProps {
  isScrolled?: boolean;
}
