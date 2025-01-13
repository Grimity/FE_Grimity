import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import "@/styles/reset.css";
import { RecoilRoot } from "recoil";
import Toast from "@/components/Toast/Toast";
import Layout from "@/components/Layout/Layout";
import Modal from "@/components/Modal/Modal";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <div className="body">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
          <Toast />
          <Modal />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
