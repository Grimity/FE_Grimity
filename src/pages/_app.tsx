import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import "@/styles/reset.css";
import { RecoilRoot } from "recoil";
import Toast from "@/components/Toast/Toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className="body">
        <Component {...pageProps} />
      </div>
      <Toast />
    </RecoilRoot>
  );
}
