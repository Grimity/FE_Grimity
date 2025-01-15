import { ReactNode, MouseEventHandler } from "react";

type XSmallButtonProps = {
  size: "xs";
  type?: never;
};

type SmallButtonProps = {
  size: "s";
  type: "primary" | "secondary" | "tertiary";
};

type LargeButtonProps = {
  size: "l";
  type?: never;
};

export type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & (XSmallButtonProps | SmallButtonProps | LargeButtonProps);
