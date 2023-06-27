import Layout from "@/components/Layout";
import { ContextProvider } from "@/context";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

export default function App({ Component, pageProps }) {
  const wallets = [new PetraWallet()];
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <ContextProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </ContextProvider>
    </AptosWalletAdapterProvider>
  );
}
