import { Roboto } from '@next/font/google'
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

const roboto = Roboto({
  weight: "400"
});

export default function App({ Component, pageProps }: AppProps) {
  console.log(process.env.NEXT_PUBLIC_TEST);
  return (
    <ChakraProvider theme={theme}>
      <main className={roboto.className}> 
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
};
