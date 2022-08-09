import { Box, Button, Divider, Heading, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { RiAddFill } from "react-icons/ri";
import { ChatContex } from "../../Context/chatProvider";
import ChatProfile from "./ChatProfile";

const MyChats = () => {
  const {
    chats,
    setChats,
    user,
    setUser,
    isSearchOpen,
    setSearchOpen,
    isProfileOpen,
    setProfileOpen,
    selectedChat,
    setSelectedChat,
  } = useContext(ChatContex);
  return (
    <Box
      backgroundColor="#0f131a"
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      justifyContent="center"
      alignItems="start"
      width={{ base: "100%", md: "30%" }}
      gap="9px"
      padding="10px"
      borderRadius="10px"
    >
      <Box
        height="fit-content"
        width="100%"
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        padding="5px"
      >
        <Heading fontSize="20">My Chats</Heading>
        <Button size={["sm"]} rightIcon={<RiAddFill />}>
          Group
        </Button>
      </Box>
      <Divider />
      <Box height="100%" width="100%">
        <VStack align="start" padding="0" spacing={["10px", "20px"]}>
          {chats.map((chat, key) => (
            <ChatProfile chat={chat} key={chat._id} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default MyChats;
