import { PropsWithChildren } from "react";

interface ChartWrapperProps extends PropsWithChildren {}

export const ChartWrapper = ({ children }: ChartWrapperProps) => <div>{children}</div>;
