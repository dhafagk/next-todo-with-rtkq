import { Box, Heading } from "@chakra-ui/react";
import React from "react";

function Header() {
  return (
    <Box bg="teal" py="4" px="5" color="white">
      <Heading size="xl">Todo List</Heading>
    </Box>
  );
}

export default Header;
