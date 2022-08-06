import React from "react";
// import { CgSun } from "react-icons/cg";
// import { BsFillSunFill } from "react-icons/bs";
import { GoMarkGithub } from "react-icons/go";
import { AiOutlineInfoCircle } from "react-icons/ai";
/*  eslint-disable-next-line */
import { Container, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      display="flex"
      minWidth="60vw"
      justifyContent="space-around"
      alignItems="center"
      p={[2, 4]}
    >
      <Text fontSize="2.3rem">WeebChat</Text>
      <div style={{ display: "flex", gap: "15px" }}>
        {/* <IconButton
          onClick={() =>
            toggleColorMode(colorMode === "light" ? "dark" : "light")
          }
          icon={colorMode === "dark   " ? <CgSun /> : <BsFillSunFill />}
        >
          Navbar
        </IconButton> */}
        {/*  eslint-disable-next-line */}
        <a href="https://github.com/keshav13142" target="_blank">
          <IconButton icon={<GoMarkGithub />} />
        </a>
        <Link to="/about">
          <IconButton icon={<AiOutlineInfoCircle />} />
        </Link>
      </div>
    </Container>
  );
};

export default Navbar;
