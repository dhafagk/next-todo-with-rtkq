import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../configs";
import { ChakraProvider } from "@chakra-ui/react";

export function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default wrapper.withRedux(App);
