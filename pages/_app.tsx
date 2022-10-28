import "../styles/globals.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/700.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <script src="https://accounts.google.com/gsi/client" async defer />
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default MyApp;
