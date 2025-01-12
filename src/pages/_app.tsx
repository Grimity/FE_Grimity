import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import "@/styles/reset.css";
import { RecoilRoot } from "recoil";
import { useToast } from "@/utils/useToast";
import Toast from "@/components/Toast/Toast";

export default function App({ Component, pageProps }: AppProps) {
  const { toast } = useToast();

  return (
    <RecoilRoot>
      <div className="body">
        <Component {...pageProps} />
      </div>
      {toast && <Toast type={toast.type}>{toast.message}</Toast>}
    </RecoilRoot>
  );
}
