import type { ReactNode } from "react";

export interface IMainLayoutProps {
  content: ReactNode;
  breadcrumbs: ReactNode;
  tools: ReactNode;
  toolsHide: boolean;
  navigation: ReactNode;
  splitPanel: ReactNode;
  search: ReactNode;
};

export interface ILandingPageLayoutProps {
  content: ReactNode;
  topLinks?: unknown;
  header: ReactNode;
}