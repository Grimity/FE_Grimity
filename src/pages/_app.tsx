import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import "@/styles/reset.css";
import { RecoilRoot } from "recoil";
import Toast from "@/components/Toast/Toast";
import Layout from "@/components/Layout/Layout";
import Modal from "@/components/Modal/Modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className="body">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
      <Toast />
      <Modal />
    </RecoilRoot>
  );
}
