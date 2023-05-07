import Layout from "@/components/Layout";
import { ContextProvider } from "@/context";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </ContextProvider>
  );
}
