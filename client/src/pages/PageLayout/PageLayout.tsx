import { ReactNode } from "react";

type PageLayoutProps = {
  className?: string;
  children: string | ReactNode;
};

export const _PageLayout = ({ className, children }: PageLayoutProps) => {
  return <div className={className}>{children}</div>;
};
