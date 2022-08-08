import {
  Avatar,
  Button,
  Container,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CgLogOut, CgProfile, CgSearch } from "react-icons/cg";
import { GoMarkGithub } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { ChatContex } from "../Context/chatProvider";

const Navbar = () => {
  const { user, setUser, setOpen } = useContext(ChatContex);

  const navigate = useNavigate();
  const logout = async () => {
    const data = await fetch("/api/user/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    });

    if (data.ok) setUser(null);

    localStorage.clear();

    navigate("/");
  };

  const toggleOpen = () => {
    setOpen(true);
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
      <Heading fontSize={[20, 22, 26]}>WeebChat</Heading>
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
            <Text fontSize={[12, 15]} fontWeight="400">
              Search Users
            </Text>
            <Icon as={CgSearch} />
          </Button>
          <Menu>
            <MenuButton
              style={{ cursor: "pointer" }}
              as={Avatar}
              icon={<Avatar name="Guest" src={user.pic} />}
            />
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
