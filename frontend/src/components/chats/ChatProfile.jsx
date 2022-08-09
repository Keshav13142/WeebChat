import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ChatContex } from "../../Context/chatProvider";

const ChatProfile = ({ chat }) => {
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
      width="100%"
      variant="ghost"
      name={chat.users[1]._id}
      cursor={"pointer"}
      display={"flex"}
      justifyContent="start"
      alignItems="center"
      borderRadius="10px"
      _hover={{ backgroundColor: "#2c313d" }}
      gap="10px"
      padding="3px"
      onClick={() => {
        setSelectedChat(chat);
      }}
    >
      <Avatar
        marginLeft="5px"
        boxSize="10"
        src={chat.users[1].pic}
        name={chat.users[1].name}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          color: "white",
          gap: "3px",
        }}
      >
        <Text fontSize={18}>{chat.users[1].name}</Text>
        <Text fontSize="15px" fontWeight="200">
          {selectedChat?.latestMessage || "Start a chat"}
        </Text>
      </div>
    </Box>
  );
};

export default ChatProfile;
