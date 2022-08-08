import {
  Avatar,
  Button,
  Container,
  Heading,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CgLogOut, CgProfile, CgSearch } from "react-icons/cg";
import { GoMarkGithub } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ChatContex } from "../Context/chatProvider";

const Navbar = () => {
  const { user, setUser, setSearchOpen } = useContext(ChatContex);

  const navigate = useNavigate();

  const logout = async () => {
    localStorage.clear();

    setUser(null);

    navigate("/");

    await fetch("/api/user/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    });
  };

  const toggleOpen = () => {
    setSearchOpen(true);
  };

  return (
    <Container
      display="flex"
      minWidth="100vw"
      justifyContent="space-evenly"
      // gap={10}
      alignItems="center"
      p={2}
    >
      <div
        style={{
          display: "flex",
          gap: "7px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Heading fontSize={[20, 22, 26]}>WeebChat</Heading>
        <Image mt={1} boxSize="25px" src={require("../assets/logo.png")} />
      </div>
      {!user ? (
        <div style={{ display: "flex", gap: "15px" }}>
          {/*  eslint-disable-next-line */}
          <a href="https://github.com/keshav13142" target="_blank">
            <IconButton icon={<GoMarkGithub />} />
          </a>
          <Link to="/about">
            <IconButton icon={<AiOutlineInfoCircle />} />
          </Link>
        </div>
      ) : (
        <>
          <Button className="nav-search" onClick={toggleOpen}>
            <Text
              display={{ base: "none", md: "flex" }}
              fontSize={[12, 15]}
              fontWeight="400"
            >
              Search Users
            </Text>
            <Icon as={CgSearch} />
          </Button>
          <Menu>
            <MenuButton
              variant="ghost"
              rightIcon={<RiArrowDropDownLine />}
              style={{ cursor: "pointer" }}
              as={Button}
            >
              <Avatar
                boxSize={[8, 9]}
                size={["sm"]}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList className="profile-menu">
              <div className="menu-content">
                <Button width={["150px", "200px"]} rightIcon={<CgProfile />}>
                  Your Profile
                </Button>
              </div>
              <div className="menu-content">
                <Button
                  onClick={logout}
                  width={["150px", "200px"]}
                  rightIcon={<CgLogOut />}
                >
                  Logout
                </Button>
              </div>
            </MenuList>
          </Menu>
        </>
      )}
    </Container>
  );
};

export default Navbar;
