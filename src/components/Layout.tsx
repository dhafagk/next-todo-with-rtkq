import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { Header } from "./index";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <Box p={5}>{children}</Box>
    </>
  );
}

export default Layout;
