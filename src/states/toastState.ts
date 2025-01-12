import { atom } from "recoil";

export interface Toast {
  message: string;
  type: "success" | "error";
}

export const toastAtom = atom<Toast | null>({
  key: "toastAtom",
  default: null,
});
