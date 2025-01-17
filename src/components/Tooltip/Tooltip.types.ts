export interface TooltipProps {
  message: string;
  position?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  hasCloseBtn?: boolean;
  onClose?: () => void;
}
