import { useRecoilState } from "recoil";
import { toastAtom } from "@/states/toastState";

export function useToast() {
  const [toast, setToast] = useRecoilState(toastAtom);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  const removeToast = () => {
    setToast(null);
  };

  return { toast, showToast, removeToast };
}
