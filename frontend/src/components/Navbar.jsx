import React from "react";
import { CgSun } from "react-icons/cg";
import { BsFillSunFill } from "react-icons/bs";
import { Container, IconButton, Text, useColorMode } from "@chakra-ui/react";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      display="flex"
      minWidth="70vw"
      justifyContent="space-between"
      alignItems="center"
      padding="10px"
    >
      <Text fontSize="2.3rem">WeebChat</Text>
      <IconButton
        onClick={() =>
          toggleColorMode(colorMode === "light" ? "dark" : "light")
        }
        icon={colorMode === "dark   " ? <CgSun /> : <BsFillSunFill />}
      >
        Navbar
      </IconButton>
    </Container>
  );
};

export default Navbar;
