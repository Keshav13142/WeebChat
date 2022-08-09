import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContex } from "../../Context/chatProvider";

const ChatBox = () => {
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
    setDisplayUser,
    setSelectedChat,
  } = useContext(ChatContex);
  return (
    <Box
      backgroundColor="#0f131a"
      display={"flex"}
      flexDirection="column"
      justifyContent="center"
      alignItems="start"
      width={{ base: "100%", md: "70%" }}
      gap="10px"
      padding="10px"
      borderRadius="10px"
    >
      <Box
        height="fit-content"
        width="100%"
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
          gap="10px"
          cursor="pointer"
          onClick={() => {
            setDisplayUser(selectedChat.users[1]);
            setProfileOpen(true);
          }}
        >
          <Avatar
            boxSize="10"
            name={selectedChat?.users[1].name}
            src={selectedChat?.users[1].pic}
          />
          <Heading fontSize="20">{selectedChat?.users[1].name}</Heading>
        </Box>
      </Box>
      <Divider />
      <Box height="100%" width="100%"></Box>
    </Box>
  );
};

export default ChatBox;
